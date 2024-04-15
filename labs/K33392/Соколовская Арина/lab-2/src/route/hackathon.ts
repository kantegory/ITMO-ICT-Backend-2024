//просмотр иныормации о хакатоне(все), добавление команды(регистрация) на хакатон(юзеры) *, 
//просмотр условия(лид,админ,куратор,жюри) *, изменение условия(куратор) *, добавление решения(лид)

import { Router, Request, Response } from 'express';

const hackathonRouter = Router();

hackathonRouter
  .route('/:id')
  .get()

hackathonRouter
  .route('/:id/register')
  .post()

hackathonRouter
  .route('/:id/task')
  .get()
  .patch()

hackathonRouter
  .route('/:id/solution')
  .post()

export default hackathonRouter;