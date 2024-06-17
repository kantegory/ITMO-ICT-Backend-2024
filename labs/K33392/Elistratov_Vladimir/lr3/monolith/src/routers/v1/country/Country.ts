import express from "express"
import CountryController from "../../../controllers/country/countryController"
import CountryService from "../../../services/country/countryService"
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router()
const controller = new CountryController(new CountryService())

router.route("/add").post(validateJWT, controller.postCreate)
router.route("/list").get(controller.listFindAll)
router.route("/one/:id").get(controller.getFindById)
router.route("/delete/:id").delete(validateJWT, controller.deleteById)
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById)

export default router
