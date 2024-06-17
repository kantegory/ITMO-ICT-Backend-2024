import express from "express"
import PlaceController from "../../../controllers/place/placeController"
import PlaceService from "../../../services/place/placeService"
import validateJWT from "../../../utils/ValidateJWT"

const router = express.Router()
const controller = new PlaceController(new PlaceService())

router.route("/rating/add").patch(validateJWT, controller.addRating)

export default router
