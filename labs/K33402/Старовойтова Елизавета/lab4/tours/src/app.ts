require('dotenv').config()
const cookieParser = require('cookie-parser')

import express, {Application} from 'express';

import { errors } from "shared-core";
import { ApiResponse } from "shared-core";

import {routers} from './api/routes';
import { initSeq, User } from "./providers/sequelize";


const app: Application = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

// Routes
for (let router of routers) {
    app.use(router.prefix, router.router)
}
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof errors.ValidationError) {
        ApiResponse.errors(res, err.errors, 422)
        return
    } else if (err instanceof errors.NotFoundError) {
        ApiResponse.notFound(res, err.message)
    } else if (err instanceof errors.UnauthenticatedError) {
        ApiResponse.error(res, 'Unauthenticated.', 401)
    } else {
        next(err)
    }
})

const PORT = process.env.PORT;

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

app.listen(PORT, async () => {
    console.log(`app listening on port ${PORT}`)
    await initSeq()
})