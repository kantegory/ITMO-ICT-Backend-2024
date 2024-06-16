import express from "express"
import ReviewController from "../../../controllers/reviews/review"


const router: express.Router = express.Router()

const controller: ReviewController = new ReviewController()

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:review_id', controller.update);
router.delete('/:id', controller.delete);


export default router
