import express from "express"
import activityRoutes from "./activities/activity"


import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()

router.use(auth, activityRoutes)

export default router