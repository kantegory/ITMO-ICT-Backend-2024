import express from 'express'

import UserBooksController from '../controllers/UserHasBookController'

const userBooksRoutes = express.Router()

userBooksRoutes.get('/', UserBooksController.getUserBooks)
userBooksRoutes.post('/', UserBooksController.addUserBook)
userBooksRoutes.delete('/', UserBooksController.deleteUserBook)

export default userBooksRoutes
