import { Router } from 'express'
import { ProductController } from '../controllers/products/Product.js'

const productRouter = Router()
const controller = new ProductController()

productRouter.get('/:pk', controller.get)
productRouter.get('/', controller.list)
productRouter.post('/', controller.post)
productRouter.put('/:pk', controller.put)
productRouter.delete('/:pk', controller.get)

export default productRouter