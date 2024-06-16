import { Router } from 'express'
import {SubscriptionController} from '../../controllers/subscription/index.js'

const router = Router()
const controller = new SubscriptionController()

router.get('/', controller.get)
router.post('/', controller.post)
router.put('/', controller.decreaseAmount)

export default router
