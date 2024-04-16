import { Router } from 'express'
import { ProductsController } from '../../controllers/products/index.js'

const router = Router()
const controller = new ProductsController()

router.get('/', controller.get)
router.post('/', controller.post)
router.put('/', controller.put)
router.delete('/', controller.get)

export default router

