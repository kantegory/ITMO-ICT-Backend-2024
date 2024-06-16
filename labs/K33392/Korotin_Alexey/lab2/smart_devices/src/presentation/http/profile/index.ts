import express from 'express';
import {jwtAuthMiddleware} from "../middleware/jwt";
import ProfileController from "./Controller";
import {ProfileRepository} from "../../../infrastructure/persistence/profile/repository";
import ProfileFactory from "../../../domain/profile/factory";

const profileRouter = express.Router();

profileRouter.use(jwtAuthMiddleware);

const profileController = new ProfileController(new ProfileRepository(), new ProfileFactory());

/**
 * @swagger
 * components:
 *      schemas:
 *          CreateProfileRequest:
 *              type: object
 *              required:
 *                  - name
 *                  - location
 *              properties:
 *                  name:
 *                      type: string
 *                  location:
 *                      type: string
 *              example:
 *                  name: My Profile
 *                  location: St. Petersburg
 *          ProfileResponse:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      format: uuid
 *                  name:
 *                      type: string
 *                  location:
 *                      type: string
 *                  userId:
 *                      type: string
 *                      format: uuid
 */
/**
 * @swagger
 * tags:
 *      name: Profile
 *      description: Smart device profile
 *
 */
profileRouter.route('').post(profileController.post);
profileRouter.route('').get(profileController.findAll);
profileRouter.route('/:id').get(profileController.get);
profileRouter.route('/:id').put(profileController.put);
profileRouter.route('/:id').delete(profileController.delete);

export default profileRouter;