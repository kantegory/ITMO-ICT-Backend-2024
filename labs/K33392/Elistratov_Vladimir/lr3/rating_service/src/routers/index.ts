import express from "express"
import userRoutes from "./v1/user/User"
import hotelRoutes from "./v1/hotel/Hotel"
import placeRoutes from "./v1/place/PLace"

const router: express.Router = express.Router()

router.use('/hotels', hotelRoutes)
router.use('/places', placeRoutes)
router.use('/users', userRoutes)


export default router