import express from "express";
import ProductController from "../../controllers/products/ProductController";

const router: express.Router = express.Router();

const controller: ProductController = new ProductController();

router
  .route("/")
  .get(controller.get)
  .patch(controller.update)
  .delete(controller.delete)
  .post(controller.create);
router.route("/findById").post(controller.findById);
router.route("/findByName").post(controller.findByName);
router.route("/findSales").get(controller.findSales);
export default router;
