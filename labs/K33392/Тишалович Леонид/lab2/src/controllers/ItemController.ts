import { Request, Response } from "express";
import ItemService from "../services/ItemServices";
import sequelize from "../database";
import { reviewService } from "./ReviewController";

export const itemService = new ItemService(sequelize);

export default class ItemController {
  static async getAllItems(req: Request, res: Response) {
    try {
      const items = await itemService.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getItemById(req: Request, res: Response) {
    try {
      const itemId = parseInt(req.params.id, 10);
      const item = await itemService.getItemById(itemId);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createItem(req: Request, res: Response) {
    try {
      const newItem = await itemService.createItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const itemId = parseInt(req.params.id, 10);
      const updatedItem = await itemService.updateItem(itemId, req.body);
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const itemId = parseInt(req.params.id, 10);
      await itemService.deleteItem(itemId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getItemReviews(req: Request, res: Response) {
    try {
      const itemId = parseInt(req.params.id, 10);
      const reviews = await reviewService.getAllReviews();
      const itemReviews = reviews.filter((review) => (review.itemId = itemId));
      res.json(itemReviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
