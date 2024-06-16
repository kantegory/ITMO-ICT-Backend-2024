import { Router } from 'express'
import { DogsController } from '../../controllers/dogs/Dog.js'

const router = Router()
const controller = new DogsController()

router.route('/')
    .post(controller.post)

router.route('/:id')
    .get(controller.get)

export default router
