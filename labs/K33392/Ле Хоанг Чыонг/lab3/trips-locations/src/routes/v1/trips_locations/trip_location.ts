import express from "express";
import TripLocationController from "../../../controllers/trips/trip_location";

const router: express.Router = express.Router();
const controller: TripLocationController = new TripLocationController();

router.post('/', controller.createTripLocation);
router.post('/trip', controller.getAllByTripId);
router.post('/location', controller.getAllByLocationId);
router.post('/id', controller.getById);
router.delete('/', controller.delete);

export default router;
