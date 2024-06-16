import { Router } from "express";
import shopRouter from "./shop";
import adminRouter from "./admin";
import userRouter from "./users";


const mainRouter = Router()


mainRouter.use('/shop', shopRouter)
mainRouter.use('/admin', adminRouter)
mainRouter.use('/users', userRouter)


export default mainRouter