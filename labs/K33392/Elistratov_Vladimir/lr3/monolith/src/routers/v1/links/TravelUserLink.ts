import express from "express"
import TravelUserLinkController from "../../../controllers/link/travelUserLink/travelUserLinkController"
import TravelUserLinkService from "../../../services/links/travelUserLink/travelUserLinkService";
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router();
const controller = new TravelUserLinkController(new TravelUserLinkService());

router.route("/add").post(validateJWT, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/one/by/user/:user_id").get(controller.getFindByUserId);
router.route("/one/by/travel/:travel_id").get(controller.getFindByTravelId);
router.route("/delete/:id").delete(validateJWT, controller.deleteById);
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById);

export default router
