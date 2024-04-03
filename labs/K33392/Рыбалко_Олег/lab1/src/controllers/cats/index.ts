import { Request, Response } from 'express'
import { Cat } from '../../models/cats/index.js'
import { CatsService } from '../../services/cats/index.js'

export class CatsController {
  service: CatsService

  constructor() {
    this.service = new CatsService()
  }

  get = async (req: Request, res: Response) => {
    try {
      res.send(this.service.get((req.body as Cat).identifier))
    } catch {
      res
        .status(404)
        .send({ error: 'cat with the specified identifier was not found' })
    }
  }
  post = async (req: Request, res: Response) => {
    try {
      res.send(this.service.create(req.body as Cat))
    } catch {
      res.status(400).send({ error: 'invalid data specified' })
    }
  }
}

