import { Request, Response } from "express";
import CartService from "../services/CartServices";

export default class CartController {
  static async getAllCarts(req: Request, res: Response) {
    try {
      const carts = await CartService.getAllCarts();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCartById(req: Request, res: Response) {
    try {
      const cartId = parseInt(req.params.id, 10);
      const cart = await CartService.getCartById(cartId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCart(req: Request, res: Response) {
    try {
      const newCart = await CartService.createCart(req.body);
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCart(req: Request, res: Response) {
    try {
      const cartId = parseInt(req.params.id, 10);
      const updatedCart = await CartService.updateCart(cartId, req.body);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCart(req: Request, res: Response) {
    try {
      const cartId = parseInt(req.params.id, 10);
      await CartService.deleteCart(cartId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
