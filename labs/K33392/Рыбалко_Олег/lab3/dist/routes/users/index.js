import { Router } from 'express';
import { UsersController } from '../../controllers/users/index.js';
const router = Router({});
const controller = new UsersController();
router.get('/:pk', controller.get);
router.post('/', controller.post);
router.post('/auth', controller.auth);
router.put('/:pk', controller.put);
router.delete('/:pk', controller.delete);
router.post('/verify', controller.verify);
export default router;
//# sourceMappingURL=index.js.map