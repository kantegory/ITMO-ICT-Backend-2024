// изменить данные о себе, посмотреть хакатоны в которых учавствует/участвовал(тогда оценки)(юзеры), посмотреть свою задачу(кураторы)
// посмотреть список хакатонов(жюри)

import { Router } from 'express';

const userController = require("../controller/user"); 
const userRouter = Router();

userRouter
  .route('/info/:id')
  .get(userController.get_user) // any
  .patch(userController.patch_user); // user itself

userRouter
  .route('/role')
  .get(userController.get_user_role_by_token) // any

userRouter
  .route('/get_id')
  .get(
    userController.get_user_id_by_token
  ) // any

export default userRouter;