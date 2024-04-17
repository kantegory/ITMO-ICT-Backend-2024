import { Sale } from '../../models/sale.js'
import { SalesService } from '../../services/sales/index.js'
import { BaseController } from '../base/index.js'

export class SalesController extends BaseController<Sale> {
  protected service: SalesService

  constructor() {
    super()
    this.service = new SalesService(Sale)
  }
}

