import express from "express";
import { UserController } from "../controllers";

const router = express.Router();

router.post("/", UserController.createUser);

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.get("/email/:email", UserController.getUserByEmail);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

export { router };
