import express from 'express';
import { UserController } from '../../controllers/users/userController';
import authenticateToken from '../../middleware/authenticateToken';

const router = express.Router();



const userController = new UserController();

router.post('/register', (req, res) => {
  userController.register(req, res);
});

router.post('/login', (req, res) => {
  userController.login(req, res);
});

router.get('/users', authenticateToken, (req, res) => {
  userController.getAllUsersWithOrders(req, res);
});

export default router;
