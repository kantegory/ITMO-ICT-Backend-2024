import express, {NextFunction} from "express";
import {UnauthenticatedError} from "../errors";
import Jwt, {JwtToken} from "../utils/jwt";
import User from "../models/user";

const checkAccessToken = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        request.user = await checkToken(request.cookies.jwt_access)
    } catch (e: any) {
        next(e)
    }
    next()
}

const checkRefreshToken = async (request: express.Request, response: express.Response, next: NextFunction) => {
    try {
        request.user = await checkToken(request.cookies.jwt_refresh)
    } catch (e: any) {
        next(e)
    }
    next()
}

const checkToken = async (token: string|null): Promise<User> => {
    if (!token) {
        throw new UnauthenticatedError()
    }

    let data: JwtToken
    try {
        data = Jwt.verify(token)
    } catch (e: any) {
        throw new UnauthenticatedError()
    }

    // @ts-ignore
    const user: User = await User.findOne({where: { email: data.sub }});
    if (!user) {
        throw new UnauthenticatedError()
    }

    return user
}

export {checkAccessToken, checkRefreshToken}