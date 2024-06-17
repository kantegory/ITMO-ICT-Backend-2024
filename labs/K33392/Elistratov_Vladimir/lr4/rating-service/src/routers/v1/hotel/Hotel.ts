import express from "express"
import HotelController from "../../../controllers/hotel/hotelController"
import HotelService from "../../../services/hotel/hotelService";
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router();
const controller = new HotelController(new HotelService());

router.route("/rating/add").patch(validateJWT, controller.addRating)

export default router
