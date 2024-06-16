import express from "express";
import OrderController from "../../controllers/orders/OrderController";

const router: express.Router = express.Router();

const controller: OrderController = new OrderController();

router
  .route("/")
  .get(controller.get)
  .delete(controller.delete)
  .post(controller.create);
router.route("/findById").post(controller.findById);
router.route("/findByUser").post(controller.findByUser);
router.route("/findByProduct").post(controller.findByProduct);
export default router;
