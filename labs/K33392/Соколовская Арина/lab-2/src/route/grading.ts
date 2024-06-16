//выставление оценок(жюри)*, вывод отсортированного/или нет списка решений на хакатон(куратор,жюри)*

import { Router, Request, Response } from 'express';

const gradingController = require("../controller/grading"); 
const gradingRouter = Router();

const juryMiddleWare = require("../middleware/juryMiddleware")

gradingRouter
  .route('/:hackathon_id')
  .post(juryMiddleWare, gradingController.post_grading) // jury only
  .get(gradingController.get_gradings); // jury only

gradingRouter
  .route('/:hackathon_id/sorted')
  .get(juryMiddleWare, gradingController.get_sorted_gradings); // jury only

export default gradingRouter;