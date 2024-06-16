import express from "express"
import LocationController from "../../../controllers/locations/location"

const router: express.Router = express.Router()

const controller: LocationController = new LocationController()

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.delete);

export default router
