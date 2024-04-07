import { NotUniqueError, ValidationError } from "../errors/user_errors";
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
            const user: User | Error = await this.userService.getById(Number(request.params.id))
            response.send(user)
        } catch (error) {
            throw error
        }
    }

    getAll = async (request: any, response: any) => {
        const users: User[] | Error = await this.userService.getAllUsers()
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