import { Sequelize } from "sequelize-typescript";
import Cart from "../models/Cart";
import { Repository } from "sequelize-typescript";

export default class CartService {
  private static cartRepository: Repository<Cart>;

  static initialize(sequelizeInstance: Sequelize): void {
    CartService.cartRepository = sequelizeInstance.getRepository(Cart);
  }
  static async getAllCarts() {
    return this.cartRepository.findAll();
  }

  static async getCartById(id: number) {
    return this.cartRepository.findByPk(id);
  }

  static async createCart(cartData: any) {
    return this.cartRepository.create(cartData);
  }

  static async updateCart(id: number, cartData: any) {
    const cart = await this.cartRepository.findByPk(id);
    if (!cart) {
      throw new Error("cart not found");
    }
    await cart.update(cartData);
    return cart;
  }

  static async deleteCart(id: number) {
    const cart = await this.cartRepository.findByPk(id);
    if (!cart) {
      throw new Error("Cart not found");
    }
    await cart.destroy();
  }
}
