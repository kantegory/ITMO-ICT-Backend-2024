import { Sale } from '../../models/Sale.js'
import { BaseService } from '../base/Base.js'
import { Product } from '../../models/Product.js'

export class SaleService extends BaseService<Sale> {
    findById = async (pk: number): Promise<Sale | null> => {
        return (await this.model.findByPk(pk, { include: Product })) as Sale | null
    }
    
    list = async (): Promise<Sale[]> => {
        return await this.model.findAll({ include: Product })
    }
}