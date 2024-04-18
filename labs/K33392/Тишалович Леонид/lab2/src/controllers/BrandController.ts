import { Request, Response } from "express";
import BrandService from "../services/BrandServices";

export default class BrandController {
  static async getAllBrands(req: Request, res: Response) {
    try {
      const brands = await BrandService.getAllBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBrandById(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id, 10);
      const brand = await BrandService.getBrandById(brandId);
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createBrand(req: Request, res: Response) {
    try {
      const newBrand = await BrandService.createBrand(req.body);
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBrand(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id, 10);
      const updatedBrand = await BrandService.updateBrand(brandId, req.body);
      res.json(updatedBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBrand(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id, 10);
      await BrandService.deleteBrand(brandId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
