//изменение решений(лид команды)* , просмотр решений(лид,куратор,жюри,админ)*

import { Router, Request, Response } from 'express';

const solutionController = require("../controller/solution"); 
const solutionRouter = Router();

const teamLeadMiddleware = require("../middleware/teamLeadMiddleware");

solutionRouter
  .route('/:id')
  .get(solutionController.get_solution) // team_leader for team on this hack, curator, jury, admin
  .patch(teamLeadMiddleware, solutionController.patch_solution); // team_leader for team on this hack


export default solutionRouter;
