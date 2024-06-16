import { Router } from 'express'
import BearController from '../../controllers/bears/controller'

const router = Router()
const controller = new BearController()

router.get('/bear/:id', controller.get)
router.post('/bear', controller.post)

export default router