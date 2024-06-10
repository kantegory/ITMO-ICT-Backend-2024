import express from 'express'

import BookController from '../controllers/BookController'

const bookRoutes = express.Router()

bookRoutes.get('/', BookController.getAllBooks)
bookRoutes.post('/', BookController.createBook)

export default bookRoutes
