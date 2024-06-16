import express from "express"
import userRoutes from "./user/User"
import refreshTokenRoutes from "./auth/RefreshToken"
import bookRoutes from "./book/Book"
import exchangeRequestRoutes from "./exchangeRequest/ExchangeRequest"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/refreshToken', refreshTokenRoutes)
router.use('/books', bookRoutes)
router.use('/exchangeRequests', exchangeRequestRoutes)

export default router