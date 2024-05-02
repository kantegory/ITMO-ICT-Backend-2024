import express from "express";
import AuthController from "../../controllers/auth/AuthController";

const router: express.Router = express.Router();

const controller: AuthController = new AuthController();

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
