import { Sequelize } from "sequelize-typescript";
import Cart from "../models/Cart";
import { Repository } from "sequelize-typescript";

export default class CartService {
  private cartRepository: Repository<Cart>;

  constructor(sequelizeInstance: Sequelize) {
    this.cartRepository = sequelizeInstance.getRepository(Cart);
  }

  async getAllCarts() {
    return this.cartRepository.findAll();
  }

  async getCartById(id: number) {
    return this.cartRepository.findByPk(id);
  }

  async createCart(cartData: any) {
    return this.cartRepository.create(cartData);
  }

  async updateCart(id: number, cartData: any) {
    const cart = await this.cartRepository.findByPk(id);
    if (!cart) {
      throw new Error("cart not found");
    }
    await cart.update(cartData);
    return cart;
  }

  async deleteCart(id: number) {
    const cart = await this.cartRepository.findByPk(id);
    if (!cart) {
      throw new Error("Cart not found");
    }
    await cart.destroy();
  }
}
