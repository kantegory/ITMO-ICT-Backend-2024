//просмотр иныормации о хакатоне(все), добавление команды(регистрация) на хакатон(юзеры) *, 
//просмотр условия(лид,админ,куратор,жюри) *, изменение условия(куратор) *, добавление решения(лид)

import { Router, Request, Response } from 'express';

const hackathonController = require("../controller/hackathon"); 
const hackathonRouter = Router();
const roleMiddleware = require("../middleware/roleMiddleware");

hackathonRouter
  .route('/:id')
  .get(hackathonController.get_hackathon); // any

hackathonRouter
  .route('/:id/register')
  .post(hackathonController.post_hackathon_team); // authenticated

hackathonRouter
  .route('/:id/task')
  .get(hackathonController.get_hackathon_task) // team_leader for team on this hack, curator, admin, jury (access check in controller)
  .patch(roleMiddleware(['curator', 'admin']), hackathonController.patch_hackathon_task); // curator, admin

hackathonRouter
  .route('/:id/solution')
  .post(hackathonController.post_hackathon_solution); // team_leader for team on this hack (access check in controller)

hackathonRouter
  .route('/')
  .get(hackathonController.get_hackathons); // any

export default hackathonRouter;
