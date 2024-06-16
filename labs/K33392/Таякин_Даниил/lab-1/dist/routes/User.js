import { Router } from 'express';
import { UserController } from '../controllers/users/User.js';
const userRouter = Router();
const controller = new UserController();
userRouter.get('/:pk', controller.get);
userRouter.post('/', controller.post);
userRouter.put('/:pk', controller.put);
userRouter.delete('/:pk', controller.delete);
userRouter.post('/auth', controller.auth);
userRouter.post('/verify', controller.verify);
export default userRouter;
//# sourceMappingURL=User.js.map