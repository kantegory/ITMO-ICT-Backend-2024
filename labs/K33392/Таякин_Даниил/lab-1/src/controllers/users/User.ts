import { Request, Response } from "express"
import { User, UserCreate } from "../../models/User.js"
import { BaseController } from "../base/Base.js"
import { UserService } from "../../services/users/User.js"
import crypto from "crypto"

export class UserController extends BaseController<User> {
    protected service: UserService

    constructor() {
        super()
        this.service = new UserService(User)
    }

    post = async (req: Request, res: Response) => {
        try {
            const body = req.body as UserCreate
      
            const newData = await this.service.create({
                email: body.email,
                passwordHash: crypto.createHash('sha256')
                                    .update(body.password)
                                    .digest('hex'),
                firstName: body.firstName,
                lastName: body.lastName,
            })
            res.status(201).json({ id: newData.id })
        } catch (error) {
            console.error('Error:', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}