import { Router } from "express";
import userRouter from "./users";
import shopRouter from "./shop";
import adminRouter from "./admin";


const mainRouter = Router()

mainRouter.use('/users', userRouter)

mainRouter.use('/shop', shopRouter)

mainRouter.use('/admin', adminRouter)


export default mainRouter