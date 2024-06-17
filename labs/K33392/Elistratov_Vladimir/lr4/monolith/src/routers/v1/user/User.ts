import express from "express"
import UserController from "../../../controllers/user/userController"
import UserService from "../../../services/user/userService"
import validateJWT from "../../../utils/ValidateJWT";

const router = express.Router()
const controller = new UserController(new UserService())

router.route("/singup").post(controller.postCreate)
router.route("/login").post(controller.login)
router.route("/list").get(controller.listFindAll)
router.route("/one/:id").get(controller.getFindById)
router.route("/delete/:id").delete(validateJWT, controller.deleteById)
router.route("/update/:id").patch(validateJWT, controller.patchUpdateById)
router.route("/update_password").patch(validateJWT, controller.patchUpdateUserPassword)
router.route("/rating/add").patch(validateJWT, controller.addRating)

export default router
