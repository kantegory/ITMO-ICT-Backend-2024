import express from "express"
import UserActivityController from "../../../controllers/users/user_activity"


const router: express.Router = express.Router()

const controller: UserActivityController = new UserActivityController()

router.post('/', controller.createUserActivity);
router.get('/', controller.getById);
router.get('/interests', controller.getAllByUserId);
router.delete('/', controller.delete);

export default router
