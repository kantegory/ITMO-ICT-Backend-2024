import express from "express"
import UserController from "../../../controllers/user/userController"
import UserService from "../../../services/user/userService";

const router = express.Router();
const controller = new UserController(new UserService());

router.route("/").post(controller.postCreate);
router.route("/:id").patch(controller.patchUpdateUserPassword);

export default router
