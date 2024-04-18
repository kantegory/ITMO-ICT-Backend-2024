import express from "express";
import CartController from "../controllers/CartController";

const router = express.Router();

router.get("/", CartController.getAllCarts);
router.get("/:id", CartController.getCartById);
router.post("/", CartController.createCart);
router.put("/:id", CartController.updateCart);
router.delete("/:id", CartController.deleteCart);

export default router;
