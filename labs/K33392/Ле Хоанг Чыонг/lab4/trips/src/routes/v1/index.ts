import express from "express"
import tripRoutes from "./trips/trip"
import tripLocationRoutes from "./trips-locations/trip_location"

const router: express.Router = express.Router()

router.use(tripRoutes)
router.use(tripLocationRoutes)

export default router