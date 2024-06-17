import { Request, Response } from "express"
import { User, UserCreate, UserLogin } from "../../models/User.js"
import { BaseController } from "../base/Base.js"
import { UserService } from "../../services/users/User.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import process from "process"

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

    auth = async (req: Request, res: Response) => {
        try {
            const body = req.body as UserLogin
            if (body.email === undefined || body.password === undefined)
                return res.sendStatus(400)
            const dbUser = await this.service.findByEmail(body.email)
      
            const pwdHash = crypto.createHash('sha256')
                                    .update(body.password)
                                    .digest('hex')
      
            if (pwdHash === dbUser!.passwordHash) {
                return res.send({
                    token: jwt.sign({sub: body.email, exp: Math.floor(Date.now() / 1000 + 60 * 100) }, process.env.SECRET_KEY as string),
                })
            } else {
                return res.status(401).send()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: 'Internal Server Error' })
        }
    }

    verify = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            if (!token) return res.sendStatus(401)
            const resp = jwt.verify(token, process.env.SECRET_KEY as string)
            await this.service.findByEmail(resp.sub as string)
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
            res.sendStatus(401)
        }
    }
}