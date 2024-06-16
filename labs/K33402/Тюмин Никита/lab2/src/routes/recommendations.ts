import express from 'express';
import {checkAccessToken} from "../middleware/auth";
import RecommendationsController from "../controllers/recommendationsController";

const router = express.Router();
const controller = new RecommendationsController()

router.get('/my', checkAccessToken, controller.my)
router.get('/tours/:id', checkAccessToken, controller.indexByTour)

export default router
