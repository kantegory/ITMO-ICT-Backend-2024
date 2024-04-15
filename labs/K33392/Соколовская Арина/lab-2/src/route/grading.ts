//выставление оценок(жюри)*, вывод отсортированного/или нет списка решений на хакатон(куратор,жюри)*

import { Router, Request, Response } from 'express';

const gradingRouter = Router();

gradingRouter
  .route('/:hackathon_id')
  .post()
  .get()

gradingRouter
  .route('/:hackathon_id/sorted')
  .get()

export default gradingRouter;