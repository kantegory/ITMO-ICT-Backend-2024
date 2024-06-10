import express from 'express'

import authRoutes from './AuthRoutes'

const router = express.Router()

router.use('/users', authRoutes)

export default router
