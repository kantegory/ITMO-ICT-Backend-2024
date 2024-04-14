import { Repository } from "sequelize-typescript";
import { NotUniqueError, ValidationError } from "../errors/user_errors";
import Item from "../models/product";
import ShoppingCartItem from "../models/shopping_cart_item";
import sequelize from "../instances/db";


class ShopService {
    private itemRepository: Repository<Item>
    private shoppingCartItemRepository: Repository<ShoppingCartItem>

    constructor() {
        this.itemRepository = sequelize.getRepository(Item);
        this.shoppingCartItemRepository = sequelize.getRepository(ShoppingCartItem)
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

    async deleteById(id: number): Promise<Number> {
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

    async getShoppingCartContents(userId: number): Promise<ShoppingCartItem[]> {
        const items = await this.shoppingCartItemRepository.findAll({where: {'userId': userId}})
        return items
    }
}

export default ShopService