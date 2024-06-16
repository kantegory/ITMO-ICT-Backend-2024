import express from "express"
import ArticleController from "../../../controllers/articles/ArticleController"
import CommentController from "../../../controllers/comments/CommentController"
import LikeController from "../../../controllers/likes/LikeController"
import FavoriteController from "../../../controllers/favorites/FavoriteController"


const router: express.Router = express.Router()

const controller: ArticleController = new ArticleController()
const commentController: CommentController = new CommentController()
const likeController: LikeController = new LikeController()
const favoriteController: FavoriteController = new FavoriteController()


router.route('/')
    .get(controller.getAll)
    .post(controller.create)

router.route('/:id')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.delete)

router
    .get('/:articleId/comments', commentController.get)
    .post('/:articleId/likes', likeController.create)
    .delete('/:articleId/likes', likeController.delete)
    .post('/:articleId/favorites', favoriteController.create)
    .delete('/:articleId/favorites', favoriteController.delete)
    .patch('/:id/status', controller.updateStatus)


export default router