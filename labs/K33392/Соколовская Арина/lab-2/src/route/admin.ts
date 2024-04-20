// создать хакатон,* назначить роли куратора и жюри*

import { Router, Request, Response } from 'express';

const adminController = require("../controller/admin");
const adminRouter = Router();

const roleMiddleware = require("../middleware/roleMiddleware");

adminRouter
  .route('/hackathon')
  .post(roleMiddleware(['admin']), adminController.post_hackathon); // admin only

adminRouter
  .route('/curator/:user_id')
  .post(roleMiddleware(['admin']), adminController.post_curator) // admin only
  .delete(roleMiddleware(['admin']), adminController.delete_curator); // admin only

adminRouter
  .route('/jury/:user_id')
  .post(roleMiddleware(['admin']), adminController.post_jury) // admin only
  .delete(roleMiddleware(['admin']), adminController.delete_jury); // admin only

export default adminRouter;