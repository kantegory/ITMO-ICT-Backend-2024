import { Router } from "express";
import ShopController from "../controllers/shop";


const adminRouter = Router()

const shopController = new ShopController()

adminRouter.route('/item')
    .post(shopController.addItem)
adminRouter.route('/item/:id')
    .delete(shopController.deleteItem)

export default adminRouter