import express from "express"
import ArticleRoutes from "./articles/ArticleRoutes"
import CommentRoutes from "./comments/CommentRoutes"
import FavoriteRoutes from "./favorites/FavoriteRoutes"
import SpecializationRoutes from "./specializations/SpecializationRoutes"

const router: express.Router = express.Router()

router.use('/articles', ArticleRoutes)
router.use('/comments', CommentRoutes)
router.use('/favorites', FavoriteRoutes)
router.use('/specializations', SpecializationRoutes)


export default router