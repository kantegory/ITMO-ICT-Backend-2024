//изменение решений(лид команды)* , просмотр решений(лид,куратор,жюри,админ)*

import { Router, Request, Response } from 'express';

const solutionController = require("../controller/solution"); 
const solutionRouter = Router();

solutionRouter
  .route('/:id')
  .get(solutionController.get_solution) // team_leader for team on this hack, curator, jury, admin (access check in controller)
  .patch(solutionController.patch_solution); // team_leader for team on this hack (access check in controller)


export default solutionRouter;
