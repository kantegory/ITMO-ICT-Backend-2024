import express from "express"
import UserController from "../../../controllers/users/user"


const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.get('/me', controller.me)
router.get('/recommend-location', controller.getLocationForUser);

router.route('/')
    .get(controller.getAllUser)
    .patch(controller.update)
    .delete(controller.delete)
export default router
