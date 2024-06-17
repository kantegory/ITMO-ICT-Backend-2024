import UserService from "../../services/user/userService"
import { Request, Response } from "express"
import User, { UserCreate, UserUpdateHomeland, UserUpdateHomelandReq, UserUpdatePassword } from "../../models/user/User"
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
        await this.passwordHandler.comparePassword(request.body["password"], user.password)

        if (!isPasswordCorrect) {
            return response.status(401).send()
        }

        const secretKey = process.env.JWTKEY
        if (!secretKey) {
            return response.status(401).send()
        }

        const token = jwt.sign({
            email: user.email
        }, secretKey)

        return response.status(200).json({"token": token})
    }

    postCreate = async (request: Request, response: Response) => {
        let body: UserCreate = request.body
        try {
            const isAlreadyExist = await this.userService.findByEmail(body["email"])
            if (isAlreadyExist) {
                return response.status(404).send({"message": "User exists"})
            }
            body.password = await this.passwordHandler.hashPassword(body.password)
            const createdUser = await this.userService.create(body)
            const dto = this.userMapper.userToDict(createdUser)
            return response.status(201).send(dto)

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }
    
    patchUpdateUserPassword = async (request: Request, response: Response) => {
        let body: UserUpdatePassword = request.body
        
        const current_user = await this.userService.findByEmail(body.email)
        if (!current_user) {
            return response.status(404).send()
        }
        
        const isPasswordCorrect =
            await this.passwordHandler.comparePassword(body.password, current_user.password)
        
        if (!isPasswordCorrect) {
            return response.status(401).send()
        }

        const data: UserCreate = {
            password: await this.passwordHandler.hashPassword(body.new_password),
            email: body.email,
        }

        try {
            const updatedUser = await this.userService.updateById(current_user.id, data)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    patchUpdateUserHomeland = async (request: Request, response: Response) => {
        let body: UserUpdateHomelandReq = request.body
        const current_user = await this.userService.findByEmail(body.email)
        if (!current_user) {
            return response.status(404).send()
        }

        const data: UserUpdateHomeland = {
            homeland_id: body.homeland_id
        }
        console.log(current_user)
        try {
            const updatedUser = await this.userService.updateById(current_user.id, data)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

}

export default UserController