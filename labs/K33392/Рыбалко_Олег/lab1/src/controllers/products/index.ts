import { Request, Response } from 'express'
import { Product } from '../../models/product.js'
import { ProductsService } from '../../services/products/index.js'
import { BaseController } from '../base/index.js'

export class ProductsController extends BaseController<Product> {
  protected service: ProductsService

  constructor() {
    super()
    this.service = new ProductsService(Product)
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

