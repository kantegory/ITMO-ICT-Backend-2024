import express from "express"
import TravelController from "../../../controllers/travel/travelController"
import TravelService from "../../../services/travel/travelService";
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router();
const controller = new TravelController(new TravelService());

router.route("/add").post(validateJWT, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/list/by/dep_city/:dep_city_id").get(controller.listFindAllByDepartureCityId);
router.route("/list/by/dep_and_dest_city/:dep_city_id/:dest_city_id").get(controller.listFindAllByDestinationAndDepartureCityId);
router.route("/one/:id").get(controller.getFindById);
router.route("/delete/:id").delete(validateJWT, controller.deleteById);
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById);

export default router
