import { Router } from 'express';
import { ProductsController } from '../../controllers/products/index.js';
const router = Router();
const controller = new ProductsController();
router.get('/:pk', controller.get);
router.get('/', controller.list);
router.post('/', controller.post);
router.put('/:pk', controller.put);
router.delete('/:pk', controller.delete);
export default router;
//# sourceMappingURL=index.js.map