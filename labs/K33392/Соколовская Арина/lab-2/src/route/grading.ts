//выставление оценок(жюри)*, вывод отсортированного/или нет списка решений на хакатон(куратор,жюри)*

import { Router, Request, Response } from 'express';

const gradingController = require(require("../controller/grading")); 
const gradingRouter = Router();

gradingRouter
  .route('/:hackathon_id')
  .post(gradingController.post_grading)
  .get(gradingController.get_gradings);

gradingRouter
  .route('/:hackathon_id/sorted')
  .get(gradingController.get_sorted_gradings);

export default gradingRouter;