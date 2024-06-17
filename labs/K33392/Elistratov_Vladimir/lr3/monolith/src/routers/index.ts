import express from "express"
import userRoutes from "./v1/user/User"
import cityRoutes from "./v1/city/City"
import countryRoutes from "./v1/country/Country"
import hotelCommentRoutes from "./v1/comment/hotelComment/HotelComment"
import placeCommentRoutes from "./v1/comment/placeComment/PlaceComment"
import userCommentRoutes from "./v1/comment/userComment/UserComment"
import hotelRoutes from "./v1/hotel/Hotel"
import travelUserLinkRoutes from "./v1/links/TravelUserLink"
import placeRoutes from "./v1/place/PLace"
import transportRoutes from "./v1/transport/Transport"
import travelRoutes from "./v1/travel/Travel"
import userInfoRoutes from "./v1/userInfo/UserInfo"

const router: express.Router = express.Router()

router.use('/cities', cityRoutes)
router.use('/comments/hotel', hotelCommentRoutes)
router.use('/comments/place', placeCommentRoutes)
router.use('/comments/user', userCommentRoutes)
router.use('/countries', countryRoutes)
router.use('/hotels', hotelRoutes)
router.use('/links/travel_user', travelUserLinkRoutes)
router.use('/places', placeRoutes)
router.use('/transports', transportRoutes)
router.use('/travels', travelRoutes)
router.use('/users', userRoutes)
router.use('/users/info', userInfoRoutes)


export default router