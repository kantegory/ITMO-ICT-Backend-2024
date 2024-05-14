//просмотр иныормации о хакатоне(все), добавление команды(регистрация) на хакатон(юзеры) *, 
//просмотр условия(лид,админ,куратор,жюри) *, изменение условия(куратор) *, добавление решения(лид)

import { Router, Request, Response } from 'express';

const hackathonController = require("../controller/hackathon"); 
const hackathonRouter = Router();

hackathonRouter
  .route('/:id')
  .get(hackathonController.get_hackathon); // any

hackathonRouter
  .route('/:id/register')
  .post(hackathonController.post_hackathon_team); // authenticated

hackathonRouter
  .route('/:id/task')
  .get(hackathonController.get_hackathon_task) // team_leader for team on this hack, curator, admin, jury
  .patch(hackathonController.patch_hackathon_task); // curator, admin

hackathonRouter
  .route('/:id/solution')
  .post(hackathonController.post_hackathon_solution); // team_leader for team on this hack

hackathonRouter
  .route('/')
  .get(hackathonController.get_hackathons); // any

export default hackathonRouter;

function roleMiddleware(arg0: string[]): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
  throw new Error('Function not implemented.');
}
