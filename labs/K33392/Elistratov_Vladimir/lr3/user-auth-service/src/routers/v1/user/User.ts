import express from "express"
import UserController from "../../../controllers/user/userController"
import UserService from "../../../services/user/userService"
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router()
const controller = new UserController(new UserService())

router.route("/singup").post(controller.postCreate)
router.route("/login").post(controller.login)
router.route("/update_password").patch(validateJWT, controller.patchUpdateUserPassword)
router.route("/update_homeland").patch(validateJWT, controller.patchUpdateUserHomeland)

export default router
