import { Product } from '../../models/Product.js'
import { BaseService } from '../base/Base.js'

export class ProductService extends BaseService<Product> {
    list = async (): Promise<Product[]> => {
        return await this.model.findAll()
    }
}