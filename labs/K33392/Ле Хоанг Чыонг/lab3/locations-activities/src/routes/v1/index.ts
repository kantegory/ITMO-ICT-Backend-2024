import express from "express"

import locationActivityRoutes from "./locations_activities/location_activity"

import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()

router.use(auth, locationActivityRoutes)

export default router