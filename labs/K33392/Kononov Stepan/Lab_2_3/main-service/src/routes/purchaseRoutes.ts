import { Router } from 'express';
import PurchaseController from '../controllers/PurchaseController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/purchase', authMiddleware, PurchaseController.purchaseProduct);
router.get('/purchase/history/:userId', authMiddleware, PurchaseController.getPurchaseHistory);

export default router;