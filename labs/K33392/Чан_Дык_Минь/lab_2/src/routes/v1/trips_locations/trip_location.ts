import express from "express"
import TripLocationController from "../../../controllers/trips/trip_location";


const router: express.Router = express.Router()

const controller: TripLocationController = new TripLocationController()

router.post('/', controller.createTripLocation);
router.get('/', controller.getById);
router.get('/location', controller.getAllByLocationId);
router.get('/trip', controller.getAllByTripId);
router.delete('/', controller.delete);

export default router
