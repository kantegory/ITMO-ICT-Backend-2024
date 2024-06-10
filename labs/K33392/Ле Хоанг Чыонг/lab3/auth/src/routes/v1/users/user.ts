import express from "express"
import UserController from "../../../controllers/users/user";
import { auth } from "../../../middlewares/auth";
const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.get('/me',auth, controller.me)
router.get('/all', controller.getAllUser)
router.post('/user', controller.getUserById)
router.put('/me/update-activity', controller.updateActivities)

export default router

