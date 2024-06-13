import express from 'express';
import { UserController } from '../controllers/User';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deleteUser);

export { router as userRoutes };
