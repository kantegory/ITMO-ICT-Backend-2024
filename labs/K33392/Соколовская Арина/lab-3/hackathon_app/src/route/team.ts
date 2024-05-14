// изменение информации о команде(лид команды) *, добавление пользователей(лид команды) *

import { Router, Request, Response } from 'express';

const teamController = require("../controller/team"); 
const teamRouter = Router();

teamRouter
  .route('/:id')
  .patch(teamController.patch_team); // team_leader for team (access check in controller)

teamRouter
  .route('/:id/:user_id')
  .post(teamController.post_participant); // team_leader for team (access check in controller TO DO)

export default teamRouter;