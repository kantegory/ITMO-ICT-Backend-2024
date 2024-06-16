import express from "express"
import UserActivityController from "../../../controllers/activities/userActivity";


const router: express.Router = express.Router()

const controller: UserActivityController = new UserActivityController()

router.post('/create-user-activity', controller.createUserActivity);
router.get('/all-user-activity', controller.getAllByUserId);
router.get('/user-activity', controller.getById);
router.delete('/delete-user-activity', controller.delete);


export default router

