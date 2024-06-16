import express from "express";
import { UserController } from "../../controllers/users/userController";

const router = express.Router();

const userController = new UserController();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/:id", userController.getUserWithOrders);
router.post("/verify", userController.verify);

export default router;
