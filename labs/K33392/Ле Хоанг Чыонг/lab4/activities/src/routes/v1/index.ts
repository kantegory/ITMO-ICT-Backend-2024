import express from "express"
import activityRoutes from "./activities/activity"
import UserActivityRoutes from "./user-activity/user_activity"
import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()

router.use(auth, activityRoutes)
router.use(auth, UserActivityRoutes)

export default router