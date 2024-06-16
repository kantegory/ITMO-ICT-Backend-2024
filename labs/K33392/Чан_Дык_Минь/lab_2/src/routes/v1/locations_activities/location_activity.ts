import express from "express"
import LocationActivityController from "../../../controllers/locations/location_activity";


const router: express.Router = express.Router()

const controller: LocationActivityController = new LocationActivityController()

router.post('/', controller.createLocationActivity);
router.get('/', controller.getById);
router.get('/location', controller.getAllByLocationId);
router.get('/activity', controller.getAllByActivityId);
router.delete('/', controller.delete);

export default router
