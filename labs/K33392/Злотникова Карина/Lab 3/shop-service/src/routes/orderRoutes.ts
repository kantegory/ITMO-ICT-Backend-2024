import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import authenticate from '../middleware/authMiddleware';

const router = Router();

router.post('/order', authenticate, OrderController.placeOrder);
router.get('/order/history/:userId', authenticate, OrderController.getOrderHistory);

export default router;