import UserService from "../../services/user/userService"
import { Request, Response } from "express"
import { UserCreate } from "../../models/user/User"
import UserMapper from "../../mapper/user/userMapper"
import PasswordHandler from "../../utils/PasswordHandler"
import jwt from 'jsonwebtoken'
import passwordHandler from "../../utils/PasswordHandler";
import axios from "axios"

class UserController {
    private readonly userService: UserService
    private readonly userMapper = new UserMapper()
    private readonly passwordHandler = new PasswordHandler()

    constructor(userService: UserService) {
        this.userService = userService
    }

    login = async (request: Request, response: Response) => {
        try {
            const auth_response = await axios.post(process.env.auth_service_url + "users/login", {
                email: request.body["email"],
                password: request.body["password"]
            })
            return response.status(200).json({"token": auth_response.data["token"]})

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const user = await this.userService.findById(id)
        if (!user) {
            return response.status(404).send()
        }

        const dto = this.userMapper.userToDict(user)
        return response.status(200).json(dto)
    }

    postCreate = async (request: Request, response: Response) => {
        try {
            const createdUser = await axios.post(process.env.auth_service_url + "users/singup", {
                email: request.body["email"],
                password: request.body["password"]
            })
            const dto = this.userMapper.userToDict(createdUser.data)
            return response.status(201).send(dto)
        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    patchUpdateUserPassword = async (request: Request, response: Response) => {
        try {
            const update_response = await axios.patch(process.env.auth_service_url + "users/update_password",
            {
                email: request.body["email"],
                password: request.body["password"],
                new_password: request.body["new_password"]
            },
            {headers:{Authorization: request.headers.authorization}})
            return response.status(201).send({"message": update_response.data["message"]})
        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: UserCreate = request.body
        const id = Number(request.params.id)
        try {
            body.password = await this.passwordHandler.hashPassword(body.password)
            const updatedUser = await this.userService.updateById(id, body)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    addRating = async (request: Request, response: Response) => {
        try {
            const update_response = await axios.patch(process.env.rating_service_url + "users/rating/add",
            {
                target_email: request.body["target_email"],
                rating: request.body["rating"]
            },
            {headers:{Authorization: request.headers.authorization}})
            return response.status(201).send({"message": update_response.data["message"]})
        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const userList = await this.userService.findAll()
        if (!userList) {
            return response.status(404).send()
        }

        let data: any[] = []

        userList.forEach( user => {
            data.push(this.userMapper.userToDict(user))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const deletedRows = await this.userService.deleteById(id)
        if (deletedRows === 0) {
            return response.status(404).send()
        }

        return response.status(204).send()
    }
}

export default UserController