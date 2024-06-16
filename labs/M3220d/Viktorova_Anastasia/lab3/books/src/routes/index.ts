import express from "express"
import bookRoutes from "./book/Book"
import exchangeRequestRoutes from "./exchangeRequest/ExchangeRequest"

const router: express.Router = express.Router()

router.use('/books', bookRoutes)
router.use('/exchangeRequests', exchangeRequestRoutes)

export default router