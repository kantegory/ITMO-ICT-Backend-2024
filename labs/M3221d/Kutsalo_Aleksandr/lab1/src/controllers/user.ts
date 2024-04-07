import { NotUniqueError, UserNotFound, ValidationError } from "../errors/user_errors";
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
        } catch (error) {
            response.status(400).send({'response': error.message})
            return
        }
        response.status(200).send({'response': "Success"})
        return
    }

}

export default UserController