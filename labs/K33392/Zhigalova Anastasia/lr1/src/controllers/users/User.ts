import { Request, Response } from "express"
import { UserRepository } from "../../services/users/User.js"


export class UserController {
    service: UserRepository
  
    constructor() {
      this.service = new UserRepository()
    }
  
    get = async (req: Request, res: Response) => {
        try {
            const user = await this.service.get()
            res.send(user)
        } catch (error) {
            console.error(error.message)
            res.status(404).send({ error: error.message })
        }
    };
    
    post = async (req: Request, res: Response) => {
      try {
            const user = await this.service.create(req.body)
            res.json(user);
      } catch {
        res.status(400).send({ error: 'Указанные неверные данные' })
      }
    }
  }