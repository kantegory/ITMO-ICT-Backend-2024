import { Router } from "express";
import userRouter from "./users";
import shopRouter from "./shop";


const mainRouter = Router()

mainRouter.use('/users', userRouter)

mainRouter.use('/shop', shopRouter)


export default mainRouter