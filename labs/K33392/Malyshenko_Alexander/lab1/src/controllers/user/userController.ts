import UserService from "../../services/user/userService"
import { Request, Response } from "express"
import { User, UserCreate } from "../../models/user/User"
import UserMapper from "../../mapper/user/userMapper"

class UserController {
    private readonly userService: UserService
    private readonly userMapper: UserMapper = new UserMapper()

    constructor(userService: UserService) {
        this.userService = userService
    }

    getAll = async (request: Request, response: Response) => {
        const userList = await this.userService.getAll()
        if (!userList) {
            return response.status(404).send()
        }

        let data: any[] = []

        userList.forEach( user => {
            data.push(this.userMapper.userToDict(user))
        })

        return response.status(200).json(data)
    }

    get = async (request: Request, response: Response) => {
        const id = Number(request.params.user_id)
        const user = await this.userService.findById(id)
        if (!user) {
            return response.status(404).send()
        }

        const data = this.userMapper.userToDict(user)
        return response.status(200).json(data)
    }

    post = async (request: Request, response: Response) => {
        const body: UserCreate = request.body

        try {
            const createdUser = await this.userService.create(body)
            const data = this.userMapper.userToDict(createdUser)
            return response.status(201).send(data)

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.user_id)
        const deletedRows = await this.userService.deleteById(id)
        if (deletedRows === 0) {
            return response.status(404).send()
        }

        return response.status(204).send()
    }

    update = async (request: Request, response: Response) => {
        const body: UserCreate = request.body
        const id = Number(request.params.user_id)
        try {
            await this.userService.updateById(id, body)
            const user = await this.userService.findById(id)
            if (!user) {
                return response.status(404).send()
            }

            const data = this.userMapper.userToDict(user)
            return response.status(200).send(data)

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }
}

export default UserController