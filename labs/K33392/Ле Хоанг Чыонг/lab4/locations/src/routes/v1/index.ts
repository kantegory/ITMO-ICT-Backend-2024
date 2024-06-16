import express from "express"
import locationRoutes from "./locations/locations"
import locationActivityRoutes from "./locations_activities/location_activity"


import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()

router.use(locationRoutes)
router.use(locationActivityRoutes)

export default router