import { Router } from "express";
import ShopController from "../controllers/shop";


const adminRouter = Router()

const shopController = new ShopController()

adminRouter.route('/item')
    .post(shopController.addItem)
adminRouter.route('/item/:id')
    .delete(shopController.deleteItem)
adminRouter.route('/tag')
    .post(shopController.addTag)
    .get(shopController.getTags)
    .put(shopController.makeAssociation) // {'itemId' : number, 'tagId': number}

export default adminRouter