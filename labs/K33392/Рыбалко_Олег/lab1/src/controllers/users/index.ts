import { User } from '../../models/user.js'
import { Request, Response } from 'express'
import { IService } from '../../services/base/index.js'
import { UsersService } from '../../services/users/index.js'
import { UserCreate } from './models.js'
import crypto from 'crypto'
import { BaseController } from '../base/index.js'

export class UsersController extends BaseController<User> {
  protected service: IService<User>

  constructor() {
    super()
    this.service = new UsersService(User)
  }

  async get(req: Request, res: Response) {
    try {
      const data = await this.service.findByPk(+req.params.pk)
      if (!data) {
        res.status(404).json({ error: 'Resource not found' })
        return
      }
      res.status(200).json(data)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async post(req: Request, res: Response) {
    try {
      const body = req.body as UserCreate

      const newData = await this.service.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        passwordHash: crypto
          .createHash('sha256')
          .update(body.password)
          .digest('hex'),
      })
      res.status(201).json({ id: newData.id })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async put(req: Request, res: Response) {
    try {
      const updatedData = await this.service.updateByPk(
        +req.params.pk,
        req.body
      )
      res.status(200).json(updatedData)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deletedCount = await this.service.deleteByPk(+req.params.pk)
      if (deletedCount === 0) {
        res.status(404).json({ error: 'Resource not found' })
        return
      }
      res.status(204).send()
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

