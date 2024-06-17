import express from "express"
import userRoutes from "./v1/user/User"

const router: express.Router = express.Router()

router.use('/users', userRoutes)


export default router