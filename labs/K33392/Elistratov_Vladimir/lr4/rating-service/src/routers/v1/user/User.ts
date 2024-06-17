import express from "express"
import UserController from "../../../controllers/user/userController"
import UserService from "../../../services/user/userService"
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router()
const controller = new UserController(new UserService())

router.route("/rating/add").patch(validateJWT, controller.addRating)

export default router
