//просмотр иныормации о хакатоне(все), добавление команды(регистрация) на хакатон(юзеры) *, 
//просмотр условия(лид,админ,куратор,жюри) *, изменение условия(куратор) *, добавление решения(лид)

import { Router, Request, Response } from 'express';

const hackathonController = require("../controller/hackathon"); 
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const teamLeadMiddleware = require("../middleware/teamLeadMiddleware");
const hackathonRouter = Router();

hackathonRouter
  .route('/:id')
  .get(hackathonController.get_hackathon); // any

hackathonRouter
  .route('/:id/register')
  .post(authMiddleware, hackathonController.post_hackathon_team); // authenticated, not curator, not jury

hackathonRouter
  .route('/:id/task')
  .get(hackathonController.get_hackathon_task) // team_leader for team on this hack, curator, admin, jury
  .patch(hackathonController.patch_hackathon_task); // curator, admin

hackathonRouter
  .route('/:id/solution')
  .post(teamLeadMiddleware, hackathonController.post_hackathon_solution); // team_leader for team on this hack

hackathonRouter
  .route('/')
  .get(roleMiddleware(['admin']), hackathonController.get_hackathons); // any

export default hackathonRouter;