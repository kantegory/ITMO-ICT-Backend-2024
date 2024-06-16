import express from 'express';
import RecommendationsController from "../controllers/recommendationsController";
import { checkAuth } from "../middleware/auth";

const router = express.Router();
const controller = new RecommendationsController()

router.get('/my', checkAuth, controller.my)
router.get('/tours/:id', checkAuth, controller.indexByTour)

export default router
