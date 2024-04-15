// изменение информации о команде(лид команды) *, добавление пользователей(лид команды) *

import { Router, Request, Response } from 'express';

const teamRouter = Router();

teamRouter
  .route('/:id')
  .patch()

teamRouter
  .route('/:id/:user_id')
  .post()

export default teamRouter;