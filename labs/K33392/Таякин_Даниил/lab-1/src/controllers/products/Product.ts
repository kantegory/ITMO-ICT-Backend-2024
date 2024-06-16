import { Request, Response } from "express"
import { Product } from "../../models/Product.js"
import { BaseController } from "../base/Base.js"
import { ProductService } from "../../services/products/Product.js"

export class ProductController extends BaseController<Product> {
    protected service: ProductService

    constructor() {
        super()
        this.service = new ProductService(Product)
    }

    list = async (req: Request, res: Response) => {
        try {
            res.status(200).send(await this.service.list())
        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }
}