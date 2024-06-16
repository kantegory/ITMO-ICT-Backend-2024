import express from 'express';
import UserController from "../controllers/userController";

const router = express.Router();
const controller = new UserController()

router.get('/:id', controller.find);
router.get('/', controller.index);
router.delete('/:id', controller.destroy);

export default router
