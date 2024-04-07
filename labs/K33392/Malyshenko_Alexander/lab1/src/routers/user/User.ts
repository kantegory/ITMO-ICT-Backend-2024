import express from "express"
import UserController from "../../controllers/user/userController"
import UserService from "../../services/user/userService";

const controller = new UserController(new UserService());
const router = express.Router();

router.route("/").post(controller.post);
router.route("/").get(controller.getAll);
router.route("/:user_id").get(controller.get);
router.route("/:user_id").put(controller.update);
router.route("/:user_id").delete(controller.delete);

export default router
