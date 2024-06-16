import express from "express"
import UserCommentController from "../../../../controllers/comment/userComment/userCommentController"
import UserCommentService from "../../../../services/comment/userComment/userCommentService";
import validateJWT from "../../../../utils/ValidateJWT";

const router = express.Router();
const controller = new UserCommentController(new UserCommentService());

router.route("/add").post(validateJWT, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/one/by/user/:user_id").get(controller.getFindByUserId);
router.route("/delete/:id").delete(validateJWT, controller.deleteById);
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById);

export default router
