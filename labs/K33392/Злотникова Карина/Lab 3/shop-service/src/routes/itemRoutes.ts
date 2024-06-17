import { Router } from 'express';
import ItemController from '../controllers/ItemController';
import authenticate from '../middleware/authMiddleware';

const router = Router();

router.post('/items', authenticate, ItemController.addItem);
router.put('/items/:id', authenticate, ItemController.modifyItem);
router.delete('/items/:id', authenticate, ItemController.removeItem);
router.get('/items/:id/stock', authenticate, ItemController.getItemStock);
router.patch('/items/:id/offer', authenticate, ItemController.applyOffer);

export default router;