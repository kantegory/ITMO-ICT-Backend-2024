// логин, авторизация

import { Router, Request, Response } from 'express';

const authRouter = Router();

authRouter
  .route('/login')
  .post()

authRouter
  .route('/enter')
  .post()

export default authRouter;