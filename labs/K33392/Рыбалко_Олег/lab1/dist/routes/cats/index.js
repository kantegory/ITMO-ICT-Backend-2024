import { Router } from 'express';
import { CatsController } from '../../controllers/cats/index.js';
const router = Router();
const controller = new CatsController();
router.get('/', controller.get);
router.post('/', controller.post);
export default router;
//# sourceMappingURL=index.js.map