import express from "express"
import reviewRoutes from "./reviews/review"
import { auth } from "../../middlewares/auth"

const router: express.Router = express.Router()


router.use(auth, reviewRoutes)

export default router