import express from "express"
import PlaceCommentController from "../../../../controllers/comment/placeComment/placeCommentController"
import PlaceCommentService from "../../../../services/comment/placeComment/placeCommentService";
import validateJWT from "../../../../utils/ValidateJWT";

const router = express.Router();
const controller = new PlaceCommentController(new PlaceCommentService());

router.route("/add").post(validateJWT, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/one/by/place/:place_id").get(controller.getFindByPlaceId);
router.route("/delete/:id").delete(validateJWT, controller.deleteById);
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById);

export default router
