import express from "express"
import ActivityController from "../../../controllers/activities/activity"


const router: express.Router = express.Router()

const controller: ActivityController = new ActivityController()

router.post('/create-activity', controller.create);
router.get('/all', controller.getAll);
router.get('/activity', controller.getById);
router.delete('/delete-activity', controller.delete);


export default router

