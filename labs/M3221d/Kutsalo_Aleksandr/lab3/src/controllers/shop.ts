import { Request, Response } from "express";


class ShopController {

    index = (request: Request, response: Response) => {
        response.render('shop/index', {title: 'World!'})
    }
}

export default ShopController