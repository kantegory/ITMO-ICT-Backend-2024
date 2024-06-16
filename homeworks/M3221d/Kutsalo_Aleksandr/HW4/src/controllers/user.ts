import { NotUniqueError, UserNotFound, ValidationError } from "../errors/userErrors";
import { createToken } from "../utility/createToken";
import User from "../models/user"
import UserService from "../services/user"
import { isCorrectPassword } from "../utility/passwordCheck";
import makeTokens from "../utility/makeTokens";
import destroyTokens from "../utility/destroyTokens";


class UserController {
    private userService: UserService; // lazy

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user: User | UserNotFound = await this.userService.getById(Number(request.params.id))
            response.status(200).json(user)
        } catch (error) {
            response.status(404).json({"response": "error", "error_message": error.message})
            return
        }
    }

    create = async (request: any, response: any) => {
        try {
            const user: User | ValidationError | NotUniqueError = await this.userService.createUser(request.body)
            
            response.locals.uId = user.id
            await makeTokens(response)
            
            response.status(200).json({'response': "success", 'userId': user.id})
            return
        } catch (error) {
            response.status(400).json({'response': 'error', 'error_message': error.message})
            return
        }
        
    }

    login = async (request: any, response: any) => {
        try {
            const user: User | UserNotFound = await this.userService.getByEmail(request.body.email)
            if (!isCorrectPassword(request.body.password, user.password)) {
                throw Error("Passwords don't match")
            }
            response.locals.uId = user.id
            await makeTokens(response)
            response.status(200).json({'response': "Success", 'userId': user.id})
        } catch (error) {
            response.status(405).json({'error': error.message})
        }
     }

    privatePage = async (request: any, response: any) => {
        response.status(200).json({'response': "Success", 'content': `Very protected auth only content for userID = ${response.locals.uId}`})
    }

    logout = async (request: any, response: any) => {
        await destroyTokens(response)
        response.status(200).json({'response': "Success", 'content': 'Cleaned current authorization'})
    }

}

export default UserController