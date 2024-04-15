//изменение решений(лид команды)* , просмотр решений(лид,куратор,жюри,админ)*

import { Router, Request, Response } from 'express';

const solutionRouter = Router();

solutionRouter
  .route('/:id')
  .get()
  .patch()


export default solutionRouter;
