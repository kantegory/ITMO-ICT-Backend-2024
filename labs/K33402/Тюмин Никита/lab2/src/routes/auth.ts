import express from 'express';
import AuthController from "../controllers/authController";
import {checkAccessToken, checkRefreshToken} from "../middleware/auth";

const router = express.Router();
const controller = new AuthController()

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', checkRefreshToken, controller.refresh);
router.post('/logout', controller.logout);
router.get('/me', checkAccessToken, controller.me);

export default router
