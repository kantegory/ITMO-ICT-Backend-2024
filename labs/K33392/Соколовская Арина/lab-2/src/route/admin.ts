// создать хакатон,* назначить роли куратора и жюри*

import { Router, Request, Response } from 'express';

const adminRouter = Router();

adminRouter
  .route('/hackathon')
  .post()

adminRouter
  .route('/curator/:user_id')
  .post()
  .delete()

adminRouter
  .route('/jury/:user_id')
  .post()
  .delete()

export default adminRouter;