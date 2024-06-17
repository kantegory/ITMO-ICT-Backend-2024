import {Router} from 'express';
import ProductController from '../controllers/ProductController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/products', authMiddleware, ProductController.createProduct);
router.put('/products/:id', authMiddleware, ProductController.updateProduct);
router.delete('/products/:id', authMiddleware, ProductController.deleteProduct);
router.get('/products/:id/quantity', authMiddleware, ProductController.getProductQuantity);
router.patch('/products/:id/discount', authMiddleware, ProductController.applyDiscount);

export default router;
