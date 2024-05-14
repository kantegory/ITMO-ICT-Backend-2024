// изменить данные о себе, посмотреть хакатоны в которых учавствует/участвовал(тогда оценки)(юзеры), посмотреть свою задачу(кураторы)
// посмотреть список хакатонов(жюри)

import { Router, Request, Response } from 'express';

const userController = require("../controller/user"); 
const userRouter = Router();

userRouter
  .route('/:id')
  .get(userController.get_user) // any
  .patch(userController.patch_user); // user itself

userRouter
  .route('token/:token')
  .post(userController.get_user_by_token) // any

userRouter
  .route('token/:token/id')
  .post(userController.get_id_by_token) // any

export default userRouter;