import { Router } from 'express'
import { UsersController } from '../../controllers/users/index.js'

const router = Router({})
const controller = new UsersController()

router.get('/:id', controller.get)
router.post('/', controller.post)
router.put('/:id', controller.put)
router.delete('/:id', controller.delete)

export default router

