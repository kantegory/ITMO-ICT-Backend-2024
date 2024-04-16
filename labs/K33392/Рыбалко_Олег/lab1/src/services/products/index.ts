import { BaseService } from '../base/index.js'
import { Product } from '../../models/product.js'

export class ProductsService extends BaseService<Product> {
  list = async (): Promise<Product[]> => {
    return await this.model.findAll()
  }
}

