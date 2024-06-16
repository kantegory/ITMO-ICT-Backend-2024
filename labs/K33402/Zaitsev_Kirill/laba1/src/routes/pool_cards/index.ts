import { Router } from 'express'
import { CardsController } from '../../controllers/pool_cards/index.js'

const router = Router()
const controller = new CardsController()

router.get('/', controller.get)
router.post('/', controller.post)
router.put('/', controller.decreaseAmount)

export default router
