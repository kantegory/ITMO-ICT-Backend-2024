import express from "express";
import BrandController from "../controllers/BrandController";

const router = express.Router();

router.get("/", BrandController.getAllBrands);
router.get("/:id", BrandController.getBrandById);
router.post("/", BrandController.createBrand);
router.put("/:id", BrandController.updateBrand);
router.delete("/:id", BrandController.deleteBrand);

export default router;
