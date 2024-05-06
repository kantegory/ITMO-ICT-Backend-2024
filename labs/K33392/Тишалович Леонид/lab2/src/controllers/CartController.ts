import { Request, Response } from "express";
import CartService from "../services/CartServices";
import sequelize from "../database";

export const cartService = new CartService(sequelize);

export default class CartController {
  static async getAllCarts(req: Request, res: Response) {
    try {
      const carts = await cartService.getAllCarts();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCartById(req: Request, res: Response) {
    try {
      const cartId = parseInt(req.params.id, 10);
      const cart = await cartService.getCartById(cartId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCart(req: Request, res: Response) {
    try {
      const newCart = await cartService.createCart(req.body);
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCart(req: Request, res: Response) {
    try {
      const cartId = parseInt(req.params.id, 10);
      const updatedCart = await cartService.updateCart(cartId, req.body);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCart(req: Request, res: Response) {
    try {
      const cartId = parseInt(req.params.id, 10);
      await cartService.deleteCart(cartId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getItemsInCart(req: Request, res: Response) {
    try {
      const cartId = parseInt(req.params.id, 10);
      const cart = await cartService.getCartById(cartId);

      const items = cart.items.filter((item) => items.quantity > 0);

      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
