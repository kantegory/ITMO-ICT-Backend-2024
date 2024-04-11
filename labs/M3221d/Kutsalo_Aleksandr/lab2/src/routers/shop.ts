import { Router } from "express";
import ShopController from "../controllers/shop";



const shopRouter = Router()
const shopController = new ShopController()

shopRouter.route('/')
    .get(shopController.index)


export default shopRouter