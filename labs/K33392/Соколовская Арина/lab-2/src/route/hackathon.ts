//просмотр иныормации о хакатоне(все), добавление команды(регистрация) на хакатон(юзеры) *, 
//просмотр условия(лид,админ,куратор,жюри) *, изменение условия(куратор) *, добавление решения(лид)

import { Router, Request, Response } from 'express';

const hackathonController = require("../controller/hackathon"); 
const hackathonRouter = Router();

hackathonRouter
  .route('/:id')
  .get(hackathonController.get_hackathon);

hackathonRouter
  .route('/:id/register')
  .post(hackathonController.post_hackathon_team);

hackathonRouter
  .route('/:id/task')
  .get(hackathonController.get_hackathon_task)
  .patch(hackathonController.patch_hackathon_task);

hackathonRouter
  .route('/:id/solution')
  .post(hackathonController.post_hackathon_solution);

export default hackathonRouter;