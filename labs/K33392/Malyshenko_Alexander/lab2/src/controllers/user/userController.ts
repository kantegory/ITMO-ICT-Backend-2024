import UserService from "../../services/user/userService"
import { Request, Response } from "express"
import { UserCreate } from "../../models/user/User"
import UserMapper from "../../mapper/user/userMapper"
import PasswordHandler from "../../utils/PasswordHandler"
import jwt from 'jsonwebtoken'

class UserController {
    private readonly userService: UserService
    private readonly userMapper = new UserMapper()
    private readonly passwordHandler = new PasswordHandler()

    constructor(userService: UserService) {
        this.userService = userService
    }

    login = async (request: Request, response: Response) => {
        const user = await this.userService.findByEmail(request.body["email"])
        if (!user) {
            return response.status(404).send()
        }

        const isPasswordCorrect =
            this.passwordHandler.comparePassword(user.password, request.body["password"])

        if (!isPasswordCorrect) {
            return response.status(401).send()
        }

        const secretKey = process.env.JWTKEY
        console.log(`SECRET KEY: ${secretKey}`)
        if (!secretKey) {
            return response.status(401).send()
        }

        const token = jwt.sign({
            email: user.email
        }, secretKey)

        return response.status(200).json({"token": token, "user": this.userMapper.userToDict(user)})
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
        const body: UserCreate = request.body

        try {
            const createdUser = await this.userService.create(body)
            const dto = this.userMapper.userToDict(createdUser)
            return response.status(201).send(dto)

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: UserCreate = request.body
        const id = Number(request.params.id)
        try {
            const updatedUser = await this.userService.updateById(id, body)
            return response.status(200).send({"message": "Updated"})

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