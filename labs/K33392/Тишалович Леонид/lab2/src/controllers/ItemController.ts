import { Request, Response } from "express";
import ItemService from "../services/ItemServices";

export default class ItemController {
  static async getAllItems(req: Request, res: Response) {
    try {
      const items = await ItemService.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getItemById(req: Request, res: Response) {
    try {
      const itemId = parseInt(req.params.id, 10);
      const item = await ItemService.getItemById(itemId);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createItem(req: Request, res: Response) {
    try {
      const newItem = await ItemService.createItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const itemId = parseInt(req.params.id, 10);
      const updatedItem = await ItemService.updateItem(itemId, req.body);
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const itemId = parseInt(req.params.id, 10);
      await ItemService.deleteItem(itemId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
