import express from "express"
import TripController from "../../../controllers/trips/trip"
import { auth } from "../../../middlewares/auth"
const router: express.Router = express.Router()

const controller: TripController = new TripController()

router.post('/',auth, controller.create);
router.get('/',auth, controller.getAll);
router.get('/trip', controller.getById);
router.delete('/:id', controller.delete);
router.put('/:trip_id', controller.update);


export default router
