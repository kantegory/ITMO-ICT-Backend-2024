import express from "express"
import UserController from "../../../controllers/users/UserController";
import UserService from "../../../services/users/UserService";

const router = express.Router();
const controller = new UserController(new UserService());

router.route("/").post(controller.post);
router.route("/:id").get(controller.get);
router.route("/:id").delete(controller.delete);

export default router;