// посмотреть список актуальных хакатонов

import { Router, Request, Response } from 'express';

const homeRouter = Router();

homeRouter
  .route('/')
  .get()

export default homeRouter;