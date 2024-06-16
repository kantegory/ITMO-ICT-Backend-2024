import express from 'express';
import TourController from "../controllers/tourController";

const router = express.Router();
const controller = new TourController()

router.get('/', controller.index);
router.get('/:id', controller.find);
router.post('/', controller.store);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router
