import { Router } from 'express'
import { SalesController } from '../../controllers/sales/index.js'

const router = Router()
const controller = new SalesController()

router.get('/:pk', controller.get)
router.get('/', controller.list)
router.post('/', controller.post)
router.put('/:pk', controller.put)
router.delete('/:pk', controller.delete)

export default router

