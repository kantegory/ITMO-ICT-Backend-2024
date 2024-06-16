import express from "express";
import LocationController from "../../../controllers/locations/location";
import { auth } from "../../../middlewares/auth";

const router: express.Router = express.Router();
const controller: LocationController = new LocationController();

router.post('/create-location', auth, controller.create);
router.get('/', auth, controller.getAll);
router.get('/location', controller.getById);
router.delete('/delete-location', auth, controller.delete);
router.put('/update-location', controller.update);
export default router;
