import express from "express"
import UserActivityRoutes from "./user-activity/userActivity"

import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()

router.use(auth, UserActivityRoutes)

export default router