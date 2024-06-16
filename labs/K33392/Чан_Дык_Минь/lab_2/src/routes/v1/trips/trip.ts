import express from "express"
import TripController from "../../../controllers/trips/trip"


const router: express.Router = express.Router()

const controller: TripController = new TripController()

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/trip', controller.getById);
router.get('/trip-query', controller.getTripByFiltering);
router.delete('/:id', controller.delete);
router.put('/:trip_id', controller.update);


export default router
