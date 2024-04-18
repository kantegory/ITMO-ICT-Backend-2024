import { Sequelize } from "sequelize-typescript";
import Item from "../models/Item";
import { Repository } from "sequelize-typescript";

export default class ItemService {
  private static itemRepository: Repository<Item>;

  static initialize(sequelizeInstance: Sequelize): void {
    ItemService.itemRepository = sequelizeInstance.getRepository(Item);
  }
  static async getAllItems() {
    return this.itemRepository.findAll();
  }

  static async getItemById(id: number) {
    return this.itemRepository.findByPk(id);
  }

  static async createItem(itemData: any) {
    return this.itemRepository.create(itemData);
  }

  static async updateItem(id: number, itemData: any) {
    const item = await this.itemRepository.findByPk(id);
    if (!item) {
      throw new Error("Item not found");
    }
    await item.update(itemData);
    return item;
  }

  static async deleteItem(id: number) {
    const item = await this.itemRepository.findByPk(id);
    if (!item) {
      throw new Error("Item not found");
    }
    await item.destroy();
  }
}
