//выставление оценок(жюри)*, вывод отсортированного/или нет списка решений на хакатон(куратор,жюри)*

import { Router, Request, Response } from 'express';

const gradingController = require("../controller/grading"); 
const gradingRouter = Router();

gradingRouter
  .route('/:hackathon_id')
  .post(gradingController.post_grading) // jury only
  .get(gradingController.get_gradings); // jury only

gradingRouter
  .route('/:hackathon_id/sorted')
  .get(gradingController.get_sorted_gradings); // jury only

export default gradingRouter;