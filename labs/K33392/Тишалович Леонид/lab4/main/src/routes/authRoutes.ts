import express from "express";
import { registerValidation } from "../validations/auth";
import UserController from "../controllers/UserControllers";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);

export default router;
