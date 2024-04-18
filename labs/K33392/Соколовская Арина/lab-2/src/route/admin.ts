// создать хакатон,* назначить роли куратора и жюри*

import { Router, Request, Response } from 'express';

const adminController = require("../controller/admin");
const adminRouter = Router();

adminRouter
  .route('/hackathon')
  .post(adminController.post_hackathon); // admin only

adminRouter
  .route('/curator/:user_id')
  .post(adminController.post_curator) // admin only
  .delete(adminController.delete_curator); // admin only

adminRouter
  .route('/jury/:user_id')
  .post(adminController.post_jury) // admin only
  .delete(adminController.delete_jury); // admin only

export default adminRouter;