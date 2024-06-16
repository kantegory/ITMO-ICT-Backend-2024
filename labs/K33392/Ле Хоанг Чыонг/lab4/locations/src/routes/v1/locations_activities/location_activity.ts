import express from "express";
import LocationActivityController from "../../../controllers/locations-activities/location_activity";

const router: express.Router = express.Router();
const controller: LocationActivityController = new LocationActivityController();


router.post('/la-create', controller.createLocationActivity);
router.get('/la', controller.getById);
router.get('/la-location', controller.getAllByLocationId);
router.get('/la-activity', controller.getAllByActivityId);
router.delete('/la', controller.delete);


export default router;
