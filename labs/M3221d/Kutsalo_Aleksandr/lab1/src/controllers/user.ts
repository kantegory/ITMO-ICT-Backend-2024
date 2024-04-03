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
        const user: User | Error = await this.userService.createUser(request.body)
    }

}

export default UserController