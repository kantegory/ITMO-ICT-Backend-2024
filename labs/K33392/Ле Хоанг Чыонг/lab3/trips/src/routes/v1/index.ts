import express from "express"
import tripRoutes from "./trips/trip"

const router: express.Router = express.Router()


router.use(tripRoutes)

export default router