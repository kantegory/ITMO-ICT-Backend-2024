import { Router } from "express";
import ShopController from "../controllers/shop";
import requireAuth from "../middleware/authMiddleware";



const shopRouter = Router()
const shopController = new ShopController()

shopRouter.route('/')
    .get(shopController.index)

shopRouter.route('/item')
    .get(shopController.getAllItems) // {tagId: number[]}

shopRouter.route('/item/:id')
    .get(shopController.getItem)
    .post(requireAuth, shopController.addToShoppingCart) // {'quantity': number}

shopRouter.route('/cart')
.get(requireAuth, shopController.getShoppingCartContents)

export default shopRouter