import RegisterUseCase from '../useCases/auth/registerUseCase'
import LoginUseCase from '../useCases/auth/loginUseCase'
import RefreshUseCase from '../useCases/auth/refreshUseCase'
import UserTransformer from '../transformers/userTransformer'
import {uniqueEmail} from "../../utils/validation/rules";
import jwtConfig from '../../config/jwt'

import { ApiResponse} from 'shared-core'
import { BaseController } from "shared-core";
import { transform } from "shared-core";

import {body} from "express-validator";
import {NextFunction} from "express";
import express from 'express';



class AuthController extends BaseController {

    register = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            await this.validate(request, [
                body('firstName').notEmpty(),
                body('lastName').notEmpty(),
                body('email').notEmpty().isEmail().custom(uniqueEmail),
                body('password').notEmpty().isLength({ min: 6 }),
            ])

            const user = await RegisterUseCase.run(request.body)
            ApiResponse.payload(response, transform(user, new UserTransformer()))
        } catch (e: any) {
            next(e)
        }
    }

    login = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            await this.validate(request, [
                body('email').notEmpty(),
                body('password').notEmpty(),
            ])

            const tokens = await LoginUseCase.run(request.body)
            response.cookie('jwt_access', tokens.accessToken, { maxAge: jwtConfig.JWT_ACCESS_TOKEN_TTL * 1000, httpOnly: true });
            response.cookie('jwt_refresh', tokens.refreshToken, { maxAge: jwtConfig.JWT_REFRESH_TOKEN_TTL * 1000, httpOnly: true });
            ApiResponse.payload(response, tokens)
        } catch (e: any) {
            next(e)
        }
    }

    refresh = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            const tokens = await RefreshUseCase.run(request.user)
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
            ApiResponse.payload(response, transform(request.user, new UserTransformer()))
        } catch (e: any) {
            next(e)
        }
    }
}

export default AuthController