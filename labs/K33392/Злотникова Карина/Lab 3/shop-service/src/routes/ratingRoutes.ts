import { Router } from 'express';
import RatingController from '../controllers/RatingController';
import authenticate from '../middleware/authMiddleware';

const router = Router();

router.post('/ratings', authenticate, RatingController.addRating);
router.get('/ratings/:itemId', authenticate, RatingController.getRatings);
router.put('/ratings/:itemId', authenticate, RatingController.updateRating);
router.delete('/ratings/:itemId', authenticate, RatingController.deleteRating);

export default router;
