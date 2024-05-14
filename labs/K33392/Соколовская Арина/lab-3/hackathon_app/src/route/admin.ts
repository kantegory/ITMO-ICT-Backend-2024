// создать хакатон,* назначить роли куратора и жюри*

import { Router, Request, Response } from 'express';

const adminController = require("../controller/admin");
const adminRouter = Router();

const roleMiddleware = require("../middleware/roleMiddleware");

adminRouter
  .route('/hackathon')
  .post(roleMiddleware(['admin']), adminController.post_hackathon); // admin only

export default adminRouter;