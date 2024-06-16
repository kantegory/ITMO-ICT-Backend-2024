import express, {NextFunction} from "express";
import { errors } from "shared-core";
import { User } from "shared-database";
import axios from "axios";
import appConfig from "../../config/app";


const checkAuth = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        const response = await axios.get(appConfig.AUTH_SERVICE_URL + '/auth/me', {
            headers: {
                // Include the cookie in the request header
                'Cookie': `jwt_access=${request.cookies.jwt_access}`
            }
        })

        request.user = new User({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
        })
    } catch (e: any) {
        next(new errors.UnauthenticatedError)
    }
    next()
}

export {checkAuth}