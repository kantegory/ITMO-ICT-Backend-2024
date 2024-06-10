import { Router } from 'express'
import { SaleController } from '../controllers/sales/Sale.js'

const saleRouter = Router()
const controller = new SaleController()

saleRouter.get('/:pk', controller.get)
saleRouter.get('/', controller.list)
saleRouter.post('/', controller.post)
saleRouter.put('/:pk', controller.put)
saleRouter.delete('/:pk', controller.get)

export default saleRouter