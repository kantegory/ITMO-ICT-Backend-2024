// изменить данные о себе, посмотреть хакатоны в которых учавствует/участвовал(тогда оценки)(юзеры), посмотреть свою задачу(кураторы)
// посмотреть список хакатонов(жюри)

import { Router, Request, Response } from 'express';

const userRouter = Router();

userRouter
  .route('/user/:id')
  .get()
  .patch()

userRouter
  .route('/user/:id/hackathons')
  .get()

userRouter
  .route('/user/:id/hackathons/active')
  .get()

export default userRouter;