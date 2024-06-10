import express from 'express'

import bookRoutes from './BookRoutes'
import exchangeRoutes from './ExchangeRoutes'
import userRoutes from './UserRoutes'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/books', bookRoutes)
router.use('/exchange', exchangeRoutes)

export default router
