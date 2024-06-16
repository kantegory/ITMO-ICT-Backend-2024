import User from '../models/user'
import IndexUserUseCase from '../useCases/users/indexUserUseCase'
import FindUserUseCase from '../useCases/users/findUserUseCase'
import DestroyUserUseCase from '../useCases/users/destroyUserUseCase'
import { transform, UserTransformer } from '../transformers'
import ApiResponse from '../responses/apiResponse'
import BaseController from "./baseController";
import express, {NextFunction} from 'express';

class UserController extends BaseController {

    index = async (request: express.Request, response: express.Response) => {
        const users: Array<User> = await IndexUserUseCase.run()
        ApiResponse.payload(response, transform(users, new UserTransformer()))
    }

    find = async (request: express.Request, response: express.Response) => {
        const user: User = await FindUserUseCase.run(Number(request.params.id))
        ApiResponse.payload(response, transform(user, new UserTransformer()))
    }

    destroy = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            await DestroyUserUseCase.run(Number(request.params.id))
            ApiResponse.success(response)
        } catch (e: any) {
            next(e)
        }
    }
}

export default UserController