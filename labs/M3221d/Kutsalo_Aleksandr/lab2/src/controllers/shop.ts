import { Request, Response } from "express";
import { Repository } from "sequelize-typescript";
import Item from "../models/product";
import ShoppingCartItem from "../models/shopping_cart_item";
import sequelize from "../instances/db";
import ShopService from "../services/shop";


class ShopController {
    private shopService: ShopService

    constructor() {
        this.shopService = new ShopService()
    }

    index = (request: Request, response: Response) => {
        response.render('shop/index', {title: 'World!'})
    }

    addItem = async (request: Request, response: Response) => {
        try {
            const item: Item | Error = await this.shopService.addItem(request.body)
            
            response.status(200).json({'response': "success", 'itemId': item.id})
            return
        } catch (error) {
            response.status(400).json({'response': 'error', 'error_message': error.message})
            return
        }
    }
    getItem = async (request: Request, response: Response) => {
        try {
            const user: Item | Error = await this.shopService.getById(Number(request.params.id))
            response.status(200).json(user)
        } catch (error) {
            response.status(404).json({"response": "error", "error_message": error.message})
            return
        }
    }
    deleteItem = async (request: Request, response: Response) => {
        try {
            await this.shopService.deleteById(Number(request.params.id))
            response.status(200).json({'response': "success"})
        } catch (error) {
            console.log(error)
            response.status(404).json({"response": "error", "error_message": error.message})
            return
        }
    }
}

export default ShopController