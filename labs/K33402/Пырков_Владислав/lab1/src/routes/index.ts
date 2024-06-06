import express from 'express'

import userRoutes from './UserRoutes'

const router = express.Router()

router.use('/users', userRoutes)

export default router
