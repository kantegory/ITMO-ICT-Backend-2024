// логин, авторизация

import { Router, Request, Response } from 'express';

const authController = require("../controller/auth"); 
const roleController = require("../controller/role"); 
const authRouter = Router();


authRouter
  .route('/register')
  .post(authController.register_user); // any

authRouter
  .route('/login')
  .post(authController.login_user); // any

authRouter
  .route('/role')
  .post(roleController.create_role);

export default authRouter;