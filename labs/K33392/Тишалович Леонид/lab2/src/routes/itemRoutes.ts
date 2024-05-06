import express from "express";
import ItemController from "../controllers/ItemController";

const router = express.Router();

router.get("/", ItemController.getAllItems);
router.get("/:id", ItemController.getItemById);
router.post("/", ItemController.createItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);
router.get("/:id/reviews", ItemController.getItemReviews);

export default router;
