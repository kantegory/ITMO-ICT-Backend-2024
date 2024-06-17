import express from 'express'

import AuthController from '../controllers/AuthController'
import ProfileController from '../controllers/ProfileController'
import UserController from '../controllers/UserController'

const userRoutes = express.Router()

userRoutes.post('/reg', AuthController.reg)
userRoutes.post('/login', AuthController.login)
userRoutes.post('/verify', AuthController.verify)

userRoutes.get('/profile', ProfileController.getProfileByUserId)
userRoutes.post('/profile', ProfileController.createOrUpdateProfile)

userRoutes.get('/user/:id', UserController.getUserById)
userRoutes.post('/user', UserController.createUser)
userRoutes.delete('/user/:id', UserController.deleteUser)

export default userRoutes
