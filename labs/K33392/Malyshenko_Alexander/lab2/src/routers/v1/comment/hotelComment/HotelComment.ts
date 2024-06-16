import express from "express"
import HotelCommentController from "../../../../controllers/comment/hotelComment/hotelCommentController"
import HotelCommentService from "../../../../services/comment/hotelComment/hotelCommentService";
import validateJWT from "../../../../utils/ValidateJWT";

const router = express.Router();
const controller = new HotelCommentController(new HotelCommentService());

router.route("/add").post(validateJWT, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/one/by/hotel/:hotel_id").get(controller.getFindByHotelId);
router.route("/delete/:id").delete(validateJWT, controller.deleteById);
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById);

export default router
