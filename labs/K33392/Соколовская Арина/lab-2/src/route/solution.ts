//изменение решений(лид команды)* , просмотр решений(лид,куратор,жюри,админ)*

import { Router, Request, Response } from 'express';

const solutionController = require(require("../controller/solution")); 
const solutionRouter = Router();

solutionRouter
  .route('/:id')
  .get(solutionController.get_solution)
  .patch(solutionController.patch_solution);


export default solutionRouter;
