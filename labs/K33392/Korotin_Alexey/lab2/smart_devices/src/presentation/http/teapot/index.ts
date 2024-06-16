import express from "express";
import {jwtAuthMiddleware} from "../middleware/jwt";
import {TeapotController} from "./Controller";
import {TeapotSubscriptionRepository} from "../../../infrastructure/persistence/devices/teapot/subscription/repository";

const teapotRouter = express.Router();

teapotRouter.use(jwtAuthMiddleware);

const controller = new TeapotController(new TeapotSubscriptionRepository());

/**
 * @swagger
 * tags:
 *      name: Teapots
 *      description: Smart teapot
 */

teapotRouter.route('').post(controller.post);
teapotRouter.route('').get(controller.findAllByProfileId);
teapotRouter.route('/:teapotId').get(controller.get);
teapotRouter.route('/:teapotId/start').post(controller.start);
teapotRouter.route('/:teapotId/subscriptions').post(controller.addSub);
teapotRouter.route('/:teapotId/state').put(controller.updateState);

export default teapotRouter;
