import user from '../../models/users/user'
import UserService from '../../services/users/user'
import { getErrorMessage } from '../../utils/getErrorMessage';
// import jwt from 'jsonwebtoken'
// import { jwtOptions } from '../../middlewares/passport'
// import RefreshTokenService from '../../services/auth/RefreshToken'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user: any = await this.userService.getAll()
            response.status(201).send(user)
        } catch (error: any) {
            response.status(404).send(getErrorMessage(error))
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request
        try {
            const user : any = await this.userService.create(body)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const userId = request.user.id;
        try {
            const user : any = await this.userService.update(userId, body)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }

    delete = async (request: any, response: any) => {
        const userId = request.user.id;
        try {
            const number : any = await this.userService.delete(userId)
            
            response.status(201).send('User have successful deleted')
        } catch (error: any) {
            response.status(400).send(getErrorMessage(error))
        }
    }


    me = async (request: any, response: any) => {
        
        response.send(request.user)
    }

}

export default UserController