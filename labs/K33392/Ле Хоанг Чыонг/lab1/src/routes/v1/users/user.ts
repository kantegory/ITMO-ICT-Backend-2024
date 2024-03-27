import express from "express"
import UserController from "../../../controllers/users/user"


const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.get('/me',controller.me)
router.route('/')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.delete)
export default router