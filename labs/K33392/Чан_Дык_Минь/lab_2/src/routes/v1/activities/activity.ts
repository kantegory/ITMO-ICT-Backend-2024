import express from "express"
import ActivityController from "../../../controllers/activities/activity"


const router: express.Router = express.Router()

const controller: ActivityController = new ActivityController()

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.delete);


export default router

