import express from 'express'

import UserController from '../controllers/UserController'

const userRoutes = express.Router()

userRoutes.get('/', UserController.getAllUsers)
userRoutes.get('/:id', UserController.getUserById)
userRoutes.post('/', UserController.createUser)
userRoutes.put('/:id', UserController.updateUser)
userRoutes.delete('/:id', UserController.deleteUser)

userRoutes.post('/verify', UserController.verify)

export default userRoutes
