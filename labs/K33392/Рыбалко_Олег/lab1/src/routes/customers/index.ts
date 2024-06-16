import { Router } from 'express'
import { CustomersController } from '../../controllers/customers/index.js'

const router = Router()
const controller = new CustomersController()

router.get('/:pk', controller.get)
router.post('/', controller.post)
router.put('/:pk', controller.put)
router.delete('/:pk', controller.get)

export default router

