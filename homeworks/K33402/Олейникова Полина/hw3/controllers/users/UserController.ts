import UserService from '../../services/users/UserService'

export default class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user = await this.userService.getAll()
            response.status(201).send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.toString() })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const user = await this.userService.update(request.user, request.body)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.userService.delete(request.user)
            response.status(201).send({ "error": 'User have successful deleted' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }

    me = async (request: any, response: any) => {
        response.send(request.user)
    }

    changePassword = async (request: any, response: any) => {
        try {
            await this.userService.changePassword(request.user, request.body)
            response.status(201).send({ "error": 'Password have successful changed' })
        } catch (error: any) {
            response.status(400).send({ "error": error.toString() })
        }
    }
}