import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/register', UserController.signUp);
router.post('/login', UserController.signIn);

export default router;