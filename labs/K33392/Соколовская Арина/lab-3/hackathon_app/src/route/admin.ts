// создать хакатон,* назначить роли куратора и жюри*

import { Router } from 'express';

const adminController = require("../controller/admin");
const adminRouter = Router();


adminRouter
  .route('/hackathon')
  .post(adminController.post_hackathon); // admin only

export default adminRouter;