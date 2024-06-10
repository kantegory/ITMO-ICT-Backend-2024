import { Request, Response } from "express";
import BrandService from "../services/BrandServices";
import sequelize from "../database";
import { itemService } from "./ItemController";

const brandService = new BrandService(sequelize);

export default class BrandController {
  static async getAllBrands(req: Request, res: Response) {
    try {
      const brands = await brandService.getAllBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBrandById(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id, 10);
      const brand = await brandService.getBrandById(brandId);
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createBrand(req: Request, res: Response) {
    try {
      const newBrand = await brandService.createBrand(req.body);
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBrand(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id, 10);
      const updatedBrand = await brandService.updateBrand(brandId, req.body);
      res.json(updatedBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBrand(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id, 10);
      await brandService.deleteBrand(brandId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBrandItems(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id, 10);
      const items = await itemService.getAllItems();
      const brandItems = items.filter((item) => item.brandId === brandId);
      res.json(brandItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
