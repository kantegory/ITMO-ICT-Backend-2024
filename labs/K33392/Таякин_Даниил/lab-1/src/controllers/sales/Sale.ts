import { Request, Response } from "express"
import { Sale } from "../../models/Sale.js"
import { BaseController } from "../base/Base.js"
import { SaleService } from "../../services/sales/Sale.js"

export class SaleController extends BaseController<Sale> {
    protected service: SaleService

    constructor() {
        super()
        this.service = new SaleService(Sale)
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