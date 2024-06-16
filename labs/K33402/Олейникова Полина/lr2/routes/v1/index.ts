import express from "express"
import userRoutes from "./users/UserRoutes"
import authRoutes from "./auth/AuthRouters"
import ArticleRoutes from "./articles/ArticleRoutes"
import CommentRoutes from "./comments/CommentRoutes"
import FavoriteRoutes from "./favorites/FavoriteRoutes"
import SpecializationRoutes from "./specializations/SpecializationRoutes"
import { auth } from "../../middlewares/auth"

const router: express.Router = express.Router()

router.use('/users', auth, userRoutes)
router.use('/articles', auth, ArticleRoutes)
router.use('/comments', auth, CommentRoutes)
router.use('/favorites', auth, FavoriteRoutes)
router.use('/specializations', auth, SpecializationRoutes)
router.use('/', authRoutes)

export default router