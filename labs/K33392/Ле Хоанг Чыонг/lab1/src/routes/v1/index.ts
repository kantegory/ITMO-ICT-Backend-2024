import express from "express"
import userRoutes from "./users/user"
import authRoutes from "./auth/auth"
import {auth} from "../../middlewares/auth"
const router: express.Router = express.Router()

router.use('/users', auth, userRoutes)
router.use('/', authRoutes)
export default router