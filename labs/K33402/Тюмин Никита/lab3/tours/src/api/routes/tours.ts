import express from 'express';
import TourController from "../controllers/tourController";
import { checkAuth } from "../middleware/auth";

const router = express.Router();
const controller = new TourController()

router.get('/', checkAuth, controller.index);
router.get('/:id', checkAuth, controller.find);
router.post('/', checkAuth, controller.store);
router.put('/:id', checkAuth, controller.update);
router.delete('/:id', checkAuth, controller.destroy);

export default router
