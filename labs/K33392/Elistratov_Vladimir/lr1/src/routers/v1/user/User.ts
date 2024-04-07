import express from "express"
import UserController from "../../../controllers/user/userController"
import UserService from "../../../services/user/userService";

const router = express.Router();
const controller = new UserController(new UserService());

router.route("/").post(controller.post);
router.route("/").get(controller.list);
router.route("/:id").get(controller.get);
router.route("/:id").delete(controller.delete);
router.route("/:id").patch(controller.patch);

export default router
