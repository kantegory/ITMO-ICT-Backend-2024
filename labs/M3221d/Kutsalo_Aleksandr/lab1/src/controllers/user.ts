import { NotUniqueError, UserNotFound, ValidationError } from "../errors/user_errors";
import { createToken, maxTokenAge } from "../middleware/create_token";
import User from "../models/user"
import UserService from "../services/user"


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
            response.status(200).send(user)
        } catch (error) {
            response.status(404).send({"response": error.message})
            return
        }
    }

    post = async (request: any, response: any) => {
        try {
            const user: User | ValidationError | NotUniqueError = await this.userService.createUser(request.body)
            
            const token = createToken(user.id)
            response.cookie('jwt', token, {httpOnly: true, maxAge: maxTokenAge})
            
            response.status(200).send({'response': "Success", 'userId': user.id})
            console.log(token)
            return
        } catch (error) {
            response.status(400).send({'response': error.message})
            return
        }
        
    }

}

export default UserController