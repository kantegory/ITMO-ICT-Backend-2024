import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser);

export { router as userRoutes };
