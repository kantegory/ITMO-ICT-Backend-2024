import User from '../models/user'
import ApiResponse from '../responses/apiResponse'
import express, {NextFunction} from 'express';
import UserService from '../services/userService'

class UserController {

    findAll = async (request: express.Request, response: express.Response) => {
        const users: Array<User> = await UserService.findAll()
        ApiResponse.payload(response, users)
    }

    findById = async (request: express.Request, response: express.Response) => {
        const user: User = await UserService.findById(Number(request.params.id))
        ApiResponse.payload(response, user)
    }

    deleteById = async (request: express.Request, response: express.Response, next: NextFunction) => {
        try {
            await UserService.deleteById(Number(request.params.id))
            ApiResponse.success(response)
        } catch (e: any) {
            next(e)
        }
    }
}

export default UserController