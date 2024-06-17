import express from "express"
import CityController from "../../../controllers/city/cityController"
import CityService from "../../../services/city/cityService"
import validateJWT from "../../../utils/ValidateJWT"
import PlaceService from "../../../services/place/placeService";

const router = express.Router()
const controller = new CityController(new CityService(), new PlaceService())

router.route("/add").post(validateJWT, controller.postCreate)
router.route("/list").get(controller.listFindAll)
router.route("/one/:id").get(controller.getFindById)
router.route("/delete/:id").delete(validateJWT, controller.deleteById)
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById)
router.route("/list/by/country/:country_id").get(controller.getFindAllByCountryId)

export default router
