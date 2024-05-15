import { Router } from "express";
import shopRouter from "./shop";
import adminRouter from "./admin";


const mainRouter = Router()


mainRouter.use('/shop', shopRouter)
mainRouter.use('/admin', adminRouter)


export default mainRouter