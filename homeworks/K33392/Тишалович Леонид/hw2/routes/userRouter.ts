import express, { Router } from "express";
import { UserController } from "../controllers/userController";

const router: Router = express.Router();
const userController = new UserController();

router.post("/create_user", userController.create);
router.patch("/update_user/:id", userController.update);
router.delete("/delete_user/:id", userController.delete);
router.get("/:id", userController.getById);
router.get("/email/:email", userController.getByEmail);

export default router;
