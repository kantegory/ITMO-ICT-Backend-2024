import { Sequelize } from "sequelize-typescript";
import Item from "../models/Item";
import { Repository } from "sequelize-typescript";

export default class ItemService {
  private itemRepository: Repository<Item>;

  constructor(sequelizeInstance: Sequelize) {
    this.itemRepository = sequelizeInstance.getRepository(Item);
  }

  async getAllItems() {
    return this.itemRepository.findAll();
  }

  async getItemById(id: number) {
    return this.itemRepository.findByPk(id);
  }

  async createItem(itemData: any) {
    return this.itemRepository.create(itemData);
  }

  async updateItem(id: number, itemData: any) {
    const item = await this.itemRepository.findByPk(id);
    if (!item) {
      throw new Error("Item not found");
    }
    await item.update(itemData);
    return item;
  }

  async deleteItem(id: number) {
    const item = await this.itemRepository.findByPk(id);
    if (!item) {
      throw new Error("Item not found");
    }
    await item.destroy();
  }
}
