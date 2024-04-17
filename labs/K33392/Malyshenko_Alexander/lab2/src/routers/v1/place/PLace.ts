import express from "express"
import PlaceController from "../../../controllers/place/placeController"
import PlaceService from "../../../services/place/placeService";
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router();
const controller = new PlaceController(new PlaceService());

router.route("/add").post(validateJWT, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/list/by/city/:city_id").get(controller.listFindAllByCityId);
router.route("/one/:id").get(controller.getFindById);
router.route("/delete/:id").delete(validateJWT, controller.deleteById);
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById);

export default router
