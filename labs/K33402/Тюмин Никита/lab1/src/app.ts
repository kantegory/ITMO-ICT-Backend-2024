import User from "./models/user";

require('dotenv').config(); // must be at the top

import express, {Application} from 'express';
import initSequelize from './providers/sequelize';
import {routers} from './routes';
import {NotFoundError, UnauthenticatedError, ValidationError} from "./errors";
import ApiResponse from "./responses/apiResponse";
const cookieParser = require('cookie-parser');

// custom request
declare global {
    namespace Express {
        interface Request {
            user: User|null
        }
    }
}

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ENV
require('dotenv').config();

// Routes
for (let router of routers) {
    app.use(router.prefix, router.router)
}
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof ValidationError) {
        ApiResponse.errors(res, err.errors)
        return
    } else if (err instanceof NotFoundError) {
        ApiResponse.notFound(res, err.message)
    } else if (err instanceof UnauthenticatedError) {
        ApiResponse.error(res, 'Unauthenticated.', 401)
    } else {
        next(err)
    }
})

const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`app listening on port ${PORT}`)
    await initSequelize()
});