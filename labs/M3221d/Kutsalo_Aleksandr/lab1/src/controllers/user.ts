import { NotUniqueError, UserNotFound, ValidationError } from "../errors/user_errors";
import { createToken, maxTokenAge } from "../middleware/create_token";
import User from "../models/user"
import UserService from "../services/user"
import { isCorrectPassword } from "../utility/password_check";


class UserController {
    private userService: UserService; // lazy

    constructor() {
        try {
            this.userService = new UserService()
        }
        catch (error) {
            throw error
        }
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
            
            const token = createToken(user.id)
            response.cookie('jwt', token, {httpOnly: true, maxAge: maxTokenAge})
            
            response.status(200).json({'response': "success", 'userId': user.id})
            console.log(token)
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
            const token = createToken(user.id)
            response.cookie('jwt', token, {httpOnly: true, maxAge: maxTokenAge})
            response.status(200).json({'response': "Success", 'userId': user.id})
        } catch (error) {
            response.status(405).json({'error': error.message})
        }
     }

}

export default UserController