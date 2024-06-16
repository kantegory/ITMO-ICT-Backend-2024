import ApiResponse from '../responses/apiResponse'
import {NextFunction} from "express";
import express from 'express';
import jwtConfig from '../config/jwt';
import AuthService from '../services/authService';


class AuthController {

    register = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const user = await AuthService.register(request.body)
            ApiResponse.payload(response, user)
        } catch (e: any) {
            next(e)
        }
    }

    login = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const tokens = await AuthService.login(request.body)
            response.cookie('jwt_access', tokens.accessToken, { maxAge: jwtConfig.JWT_ACCESS_TOKEN_TTL * 1000, httpOnly: true });
            response.cookie('jwt_refresh', tokens.refreshToken, { maxAge: jwtConfig.JWT_REFRESH_TOKEN_TTL * 1000, httpOnly: true });
            ApiResponse.payload(response, tokens)
        } catch (e: any) {
            next(e)
        }
    }

    refresh = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const tokens = await AuthService.refreshToken(request.user)
            response.cookie('jwt_access', tokens.accessToken, { maxAge: jwtConfig.JWT_ACCESS_TOKEN_TTL * 1000, httpOnly: true });
            response.cookie('jwt_refresh', tokens.refreshToken, { maxAge: jwtConfig.JWT_REFRESH_TOKEN_TTL * 1000, httpOnly: true });
            ApiResponse.payload(response, tokens)
        } catch (e: any) {
            next(e)
        }
    }

    logout = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            // await LogoutUseCase.run(request) todo revoke
            response.clearCookie('jwt_access')
            response.clearCookie('jwt_refresh')
            ApiResponse.success(response, 'ok')
        } catch (e: any) {
            next(e)
        }
    }

    me = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            ApiResponse.payload(response, request.user)
        } catch (e: any) {
            next(e)
        }
    }

}

export default AuthController