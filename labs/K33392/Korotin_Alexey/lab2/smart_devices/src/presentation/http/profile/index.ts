import express from 'express';
import {jwtAuthMiddleware} from "../middleware/jwt";
import ProfileController from "./Controller";
import {ProfileRepository} from "../../../infrastructure/persistence/profile/repository";
import ProfileFactory from "../../../domain/profile/factory";

const profileRouter = express.Router();

profileRouter.use(jwtAuthMiddleware);

const profileController = new ProfileController(new ProfileRepository(), new ProfileFactory());

profileRouter.route('').post(profileController.post);
profileRouter.route('/:id').get(profileController.get);

export default profileRouter;