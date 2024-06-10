import express from "express"

import offerRoutes from "./offers/offer"


import {auth} from "../../middlewares/auth"

const router: express.Router = express.Router()

router.use(auth, offerRoutes)


export default router