import express from "express"
import CommentController from "../../../controllers/comments/CommentController"


const router: express.Router = express.Router()

const controller: CommentController = new CommentController()

router.route('/:id')
    .patch(controller.update)
    .delete(controller.delete)

router.route('/').post(controller.create)

export default router