import express from 'express';
import UserController from "../controllers/userController";
import {checkAccessToken} from "../middleware/auth";

const router = express.Router();
const controller = new UserController()

router.get('/:id', checkAccessToken, controller.findById);
router.get('/', checkAccessToken, controller.findAll);
router.delete('/:id', checkAccessToken, controller.deleteById);

export default router
