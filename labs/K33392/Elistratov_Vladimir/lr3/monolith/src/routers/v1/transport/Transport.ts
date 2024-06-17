import express from "express"
import TransportController from "../../../controllers/transport/transportController"
import TransportService from "../../../services/transport/transportService";
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router();
const controller = new TransportController(new TransportService());

router.route("/add").post(validateJWT, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/list/by/user/:user_id").get(controller.listFindAllByUserId);
router.route("/one/:id").get(controller.getFindById);
router.route("/delete/:id").delete(validateJWT, controller.deleteById);
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById);

export default router
