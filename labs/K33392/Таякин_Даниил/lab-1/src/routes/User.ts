import { Router } from 'express'
import { UserController } from '../controllers/users/User.js'

const userRouter = Router()
const controller = new UserController()

userRouter.get('/:pk', controller.get)
userRouter.post('/', controller.post)
userRouter.put('/:pk', controller.put)
userRouter.delete('/:pk', controller.get)

export default userRouter