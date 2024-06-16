import express from "express"
import ReviewController from "../../../controllers/reviews/review"
import { auth } from "../../../middlewares/auth"
const router: express.Router = express.Router()

const controller: ReviewController = new ReviewController()

router.post('/create-review',auth, controller.create);
router.get('/all-review',auth, controller.getAll);
router.get('/review', controller.getById);
router.delete('/delete-review', controller.delete);
router.put('/update-review', controller.update);


export default router
