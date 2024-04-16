import { Repository } from "sequelize-typescript";
import { NotUniqueError, ValidationError } from "../errors/user_errors";
import Item from "../models/product";
import ShoppingCartItem from "../models/shopping_cart_item";
import sequelize from "../instances/db";
import Tag from "../models/tag";
import ItemTag from "../models/item_tag";
import { Op } from "sequelize";


class ShopService {
    private itemRepository: Repository<Item>
    private shoppingCartItemRepository: Repository<ShoppingCartItem>
    private tagRepository: Repository<Tag>
    private itemTagRepository: Repository<ItemTag>

    constructor() {
        this.itemRepository = sequelize.getRepository(Item);
        this.shoppingCartItemRepository = sequelize.getRepository(ShoppingCartItem)
        this.tagRepository = sequelize.getRepository(Tag)
        this.itemTagRepository = sequelize.getRepository(ItemTag)
    }

    async addItem(itemBody: any): Promise<Item> {
        try {
            const item = await this.itemRepository.create(itemBody)

            return item.toJSON()
        } catch (error) {
            switch (error.name) {
                case "SequelizeUniqueConstraintError": 
                    throw new NotUniqueError("Already exists")
                case "SequelizeValidationError":
                    throw new ValidationError("Data was given incorrectly")
            }
        }
    }

    async getById(id: number): Promise<Item> {
        const item = await this.itemRepository.findByPk(id)
        if (item) {
            return item.toJSON()
        } else {
            throw new Error(`Item with id of ${id} doesn't exist`)
        }
    }

    async getItems(body: any): Promise<Item[]> {
        if (body.tagId) {
            const items = await this.itemRepository.findAll({
                include: [
                    {model: sequelize.models.Tag,
                    as: 'tags'
                }],
                where: {'$tags.id$': {[Op.in]: body.tagId}}
            })
            return items
        } else {
            const items = await this.itemRepository.findAll({
                include: sequelize.models.Tag
            })
            return items
        }
    }
    async deleteById(id: number): Promise<number> {
        const deletedCount = await this.itemRepository.destroy({where: { id }})
        if (deletedCount != 1) {
            throw Error(`Item with id of ${id} doesn't exist`)
        }
        return deletedCount
    }

    async addToCart(itemId: number, userId: number, quantity: number): Promise<ShoppingCartItem> {
        const item = await this.getById(itemId)
        if (item.quantity < quantity) {
            throw Error(`Not enough items: ${item.quantity} left, ${quantity} is required`)
        }
        const shoppingCartItem = await this.shoppingCartItemRepository.create({
            'userId': userId,
            'itemId': itemId,
            'quantity': quantity
        })
        return shoppingCartItem.toJSON()
    }

    async getShoppingCartContents(userId: number): Promise<Item[]> {
        const cartItems = await this.shoppingCartItemRepository.findAll({
            where: {'userId': userId}, 
            include: sequelize.models.Item
        })
        const items = cartItems.map(item => item.item)
        return items
    }

    async makeAssociation(itemId: number, tagId: number): Promise<ItemTag> {
        const itemTag = await this.itemTagRepository.create({
            tagId: tagId,
            itemId: itemId
        })
        return itemTag.toJSON()
    }
    async getTags(): Promise<Tag[]> {
        const tags = await this.tagRepository.findAll()
        return tags
    }
    async addTag(body: any): Promise<Tag> {
        const tag = await this.tagRepository.create(body)
        return tag.toJSON()
    }
}

export default ShopService