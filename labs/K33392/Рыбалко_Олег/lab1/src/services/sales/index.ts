import { BaseService } from '../base/index.js'
import { Sale } from '../../models/sale.js'
import { Product } from '../../models/product.js'

export class SalesService extends BaseService<Sale> {
  findByPk = async (pk: number): Promise<Sale | null> => {
    return (await this.model.findByPk(pk, { include: Product })) as Sale | null
  }
  list = async (): Promise<Sale[]> => {
    return await this.model.findAll({ include: Product })
  }
}

