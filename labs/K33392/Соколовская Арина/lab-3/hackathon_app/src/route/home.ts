// посмотреть список актуальных хакатонов

import { Router, Request, Response } from 'express';

const homeController = require("../controller/home"); 
const homeRouter = Router();

homeRouter
  .route('')
  .get(homeController.get_active_hackathons);

export default homeRouter;