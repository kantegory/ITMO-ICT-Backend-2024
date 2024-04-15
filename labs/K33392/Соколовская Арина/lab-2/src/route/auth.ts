// логин, авторизация

import { Router, Request, Response } from 'express';

const authController = require(require("../controller/auth")); 
const authRouter = Router();

authRouter
  .route('/register')
  .post(authController.register_user);

authRouter
  .route('/login')
  .post(authController.login_user);

export default authRouter;