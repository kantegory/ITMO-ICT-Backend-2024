import express from "express"

import userRoutes from "./users/user"
import authRoutes from "./auth/auth"
import activityRoutes from "./activities/activity"
import locationRoutes from "./locations/locations"
import offerRoutes from "./offers/offer"
import reviewRoutes from "./reviews/review"
import tripRoutes from "./trips/trip"
import userActivityRoutes from "./users_activities/user_activity"
import tripLocationRoutes from "./trips_locations/trip_location"
import locationActivityRoutes from "./locations_activities/location_activity"

import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()


router.use('/', authRoutes)

router.use('/users', auth, userRoutes)
router.use('/activities', auth, activityRoutes)
router.use('/locations', auth, locationRoutes)
router.use('/offers', auth, offerRoutes)
router.use('/reviews', auth, reviewRoutes)
router.use('/trips', auth, tripRoutes)

router.use('/users-activities', auth, userActivityRoutes)
router.use('/trips-locations', auth, tripLocationRoutes)
router.use('/locations-activities', auth, locationActivityRoutes)

export default router