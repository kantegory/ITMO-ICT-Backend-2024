import { Request, Response } from 'express'
import { Sale } from '../../models/sale.js'
import { SalesService } from '../../services/sales/index.js'
import { BaseController } from '../base/index.js'

export class SalesController extends BaseController<Sale> {
  protected service: SalesService

  constructor() {
    super()
    this.service = new SalesService(Sale)
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

