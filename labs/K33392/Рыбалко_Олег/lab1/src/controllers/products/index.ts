import { Request, Response } from 'express'
import { Product } from '../../models/product.js'
import { IService } from '../../services/base/index.js'
import { ProductsService } from '../../services/products/index.js'
import { BaseController } from '../base/index.js'

export class ProductsController extends BaseController<Product> {
  protected service: IService<Product>

  constructor() {
    super()
    this.service = new ProductsService(Product)
  }
}

