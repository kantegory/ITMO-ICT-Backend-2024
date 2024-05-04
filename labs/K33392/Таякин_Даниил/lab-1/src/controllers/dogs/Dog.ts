import { Request, Response } from 'express'
import { Dog } from '../../models/dogs/Dog.js'
import { DogsService } from '../../services/dogs/Dog.js'

export class DogsController {
  service: DogsService

  constructor() {
    this.service = new DogsService()
  }

  get = async (req: Request, res: Response) => {
    try {
      const dog: Dog = await this.service.get(
        Number(req.params.id)
      )

      res.send(dog)
    } catch {
      res.status(404).send({ error: 'Dog with the specified id was not found' })
    }
  }
  post = async (req: Request, res: Response) => {
    try {
      const dog: Dog = await this.service.create(req.body)
      res.status(201).send(dog)
    } catch {
      res.status(400).send({ error: 'Invalid data specified' })
    }
  }
}
