// логин, авторизация

import { Router, Request, Response } from 'express';

const authController = require("../controller/auth"); 
const roleController = require("../controller/role"); 
const authRouter = Router();
const roleWiddleware = require("../middleware/roleWiddleware")


authRouter
  .route('/register')
  .post(authController.register_user); // any

authRouter
  .route('/login')
  .post(authController.login_user); // any

authRouter
  .route('/role')
  .post(roleWiddleware["admin"], roleController.create_role);

export default authRouter;