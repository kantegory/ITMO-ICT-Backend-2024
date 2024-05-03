import User from '../models/user'
import IndexUserUseCase from '../useCases/users/indexUserUseCase'
import FindUserUseCase from '../useCases/users/findUserUseCase'
import UpdateUserUseCase from '../useCases/users/updateUserUseCase'
import DestroyUserUseCase from '../useCases/users/destroyUserUseCase'
import { transform, UserTransformer } from '../transformers'
import ApiResponse from '../responses/apiResponse'
import {body} from "express-validator";
import BaseController from "./baseController";
import {NextFunction} from "express";
import express from 'express';
import {uniqueEmail} from "../validation/rules";

class UserController extends BaseController {

    index = async (request: express.Request, response: express.Response) => {
        const users: Array<User> = await IndexUserUseCase.run()
        ApiResponse.payload(response, transform(users, new UserTransformer()))
    }

    find = async (request: express.Request, response: express.Response) => {
        const user: User = await FindUserUseCase.run(Number(request.params.id))
        ApiResponse.payload(response, transform(user, new UserTransformer()))
    }

    // update = async (request: express.Request, response: express.Response, next: NextFunction) => {
    //     // todo rm
    //     try {
    //         await this.validate(request, [
    //             body('firstName').notEmpty(),
    //             body('lastName').notEmpty(),
    //             body('email').isEmail().custom(uniqueEmail),
    //             body('password').isLength({ min: 6 }),
    //         ])
    //
    //         const user : User = await UpdateUserUseCase.run(Number(request.params.id), request.body)
    //         ApiResponse.payload(response, transform(user, new UserTransformer()))
    //     } catch (e: any) {
    //         next(e)
    //     }
    // }

    destroy = async (request: express.Request, response: express.Response) => {
        await DestroyUserUseCase.run(Number(request.params.id))
        ApiResponse.success(response)
    }
}

export default UserController