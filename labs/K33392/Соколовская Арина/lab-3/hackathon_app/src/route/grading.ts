//выставление оценок(жюри)*, вывод отсортированного/или нет списка решений на хакатон(куратор,жюри)*

import { Router } from 'express';

const gradingController = require("../controller/grading"); 
const gradingRouter = Router();
const roleMiddleware = require("../middleware/roleMiddleware");

gradingRouter
  .route('/:hackathon_id')
  .post(roleMiddleware(['jury']), gradingController.post_grading) // jury only
  .get(roleMiddleware(['jury']), gradingController.get_gradings); // jury only

gradingRouter
  .route('/:hackathon_id/sorted')
  .get(roleMiddleware(['jury']), gradingController.get_sorted_gradings); // jury only

export default gradingRouter;