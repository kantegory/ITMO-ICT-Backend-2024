import express from "express"
import CityController from "../../../controllers/city/cityController"
import CityService from "../../../services/city/cityService"
import validateJWT from "../../../utils/ValidateJWT"

const router = express.Router()
const controller = new CityController(new CityService())

router.route("/add").post(validateJWT, controller.postCreate)
router.route("/list").get(controller.listFindAll)
router.route("/one/:id").get(controller.getFindById)
router.route("/delete/:id").delete(validateJWT, controller.deleteById)
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById)
router.route("/one/by/country/:country_id").get(controller.getFindByCountryId)

export default router
