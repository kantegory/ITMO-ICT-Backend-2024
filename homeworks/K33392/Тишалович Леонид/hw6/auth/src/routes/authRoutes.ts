import express from "express";
import { registerValidation } from "../validations/auth";
import AuthController from "../controllers/AuthController";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", registerValidation, AuthController.register);

export default router;
