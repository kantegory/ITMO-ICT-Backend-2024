import express from "express";
import OfferController from "../../../controllers/offers/offer";

const router: express.Router = express.Router();
const controller: OfferController = new OfferController();

router.post('/', controller.create);
router.get('/', controller.getAll);
// router.get('/me', controller.getOfferForUser);
router.get('/id', controller.getById);
router.delete('/', controller.delete);

export default router;
