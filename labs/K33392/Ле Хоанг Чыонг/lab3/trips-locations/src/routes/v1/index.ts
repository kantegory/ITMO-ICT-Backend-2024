import express from "express"
import tripLocationRoutes from "./trips_locations/trip_location"


import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()
router.use(auth, tripLocationRoutes)

export default router