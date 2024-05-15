import { Request, Response } from "express";
import Item from "../models/Item";
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
    getAllItems = async (request: Request, response: Response) => {
        try {
            const items = await this.shopService.getItems(request.body)

            response.status(200).json(items)
        } catch (error) {
            response.status(404).json({"response": "error", "error_message": error.message})
            return
        }
    }

    addToShoppingCart = async (request: Request, response: Response) => {
        try {
            const cartItem = await this.shopService.addToCart(Number(request.params.id), response.locals.uId, request.body.quantity)
            response.status(200).json({'response': "success", cartItem})
        } catch (error) {
            console.log(error)
            response.status(400).json({"response": "error", "error_message": error.message})
        }
    }

    getShoppingCartContents = async (request: Request, response: Response) => {
        try {
            const items = await this.shopService.getShoppingCartContents(response.locals.uId)
            response.status(200).json(items)
        } catch (error) {
            console.log(error)
            response.status(400).json({"response": "error", "error_message": error.message})
        }
    }

    makeAssociation = async (request: Request, response: Response) => {
        try {
            const association = await this.shopService.makeAssociation(Number(request.body.itemId), Number(request.body.tagId))
            response.status(200).json(association)
        } catch (error) {
            console.log(error)
            response.status(400).json({"response": "error", "error_message": error.message})
        }
    }
    getTags = async (request: Request, response: Response) => {
        try {
            const tags = await this.shopService.getTags()
            response.status(200).json(tags)
        } catch (error) {
            console.log(error)
            response.status(400).json({"response": "error", "error_message": error.message})
        }
    }
    addTag = async (request: Request, response: Response) => {
        try {
            const tag = await this.shopService.addTag(request.body)
            response.status(200).json(tag)
        } catch (error) {
            console.log(error)
            response.status(400).json({"response": "error", "error_message": error.message})
        }
    }
}

export default ShopController