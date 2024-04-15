// создать хакатон,* назначить роли куратора и жюри*

import { Router, Request, Response } from 'express';

const adminController = require("../controller/admin");
const adminRouter = Router();

adminRouter
  .route('/hackathon')
  .post(adminController.post_hackathon);

adminRouter
  .route('/curator/:user_id')
  .post(adminController.post_curator)
  .delete(adminController.delete_curator);

adminRouter
  .route('/jury/:user_id')
  .post(adminController.post_jury)
  .delete(adminController.delete_jury);

export default adminRouter;