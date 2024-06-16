import { Request, Response } from "express"
import { UserService } from "../service/user/service"
import { User } from "../models/User"

class UserController {
  service: UserService

  constructor() {
    this.service = new UserService()
  }

  get = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      console.log(id);
      res.send((await this.service.get(id)).toJSON())
    } catch {
      res
        .status(404)
        .send({ error: 'User with the specified id not found' })
    }
  }
  post = async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      res.send((await this.service.create(req.body as User)))
    } catch {
      res.status(400).send({ error: 'Invalid data' })
    }
  }
}

export default UserController