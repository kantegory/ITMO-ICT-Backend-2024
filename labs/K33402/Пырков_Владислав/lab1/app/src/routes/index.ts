import express from 'express'

import bookRoutes from './BookRoutes'
import exchangeRoutes from './ExchangeRoutes'
import userBooksRoutes from './UserBooksRoutes'
import userRoutes from './UserRoutes'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/books', bookRoutes)
router.use('/exchange', exchangeRoutes)
router.use('/userBooks', userBooksRoutes)

export default router
