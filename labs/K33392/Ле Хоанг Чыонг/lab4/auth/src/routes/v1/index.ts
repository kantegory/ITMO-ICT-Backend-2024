import express from "express"
import authRoutes from "./auth/auth"
import userRoutes from "./users/user"

import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router