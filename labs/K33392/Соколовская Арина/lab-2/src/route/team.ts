// изменение информации о команде(лид команды) *, добавление пользователей(лид команды) *

import { Router, Request, Response } from 'express';

const teamController = require("../controller/team"); 
const teamRouter = Router();

teamRouter
  .route('/:id')
  .patch(teamController.patch_team);

teamRouter
  .route('/:id/:user_id')
  .post(teamController.post_participant);

export default teamRouter;