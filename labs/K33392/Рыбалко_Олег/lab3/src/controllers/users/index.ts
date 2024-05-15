import { User } from '../../models/user.js'
import { Request, Response } from 'express'
import { UsersService } from '../../services/users/index.js'
import { UserCreate, Auth } from './models.js'
import crypto from 'crypto'
import process from 'process'
import jwt from 'jsonwebtoken'

export class UsersController {
  protected service: UsersService

  constructor() {
    this.service = new UsersService(User)
  }

  get = async (req: Request, res: Response) => {
    try {
      const data = await this.service.findByPk(parseFloat(req.params.pk))
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

  post = async (req: Request, res: Response) => {
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

  put = async (req: Request, res: Response) => {
    try {
      const body = req.body as UserCreate

      const updatedData = await this.service.updateByPk(+req.params.pk, {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        passwordHash: crypto
          .createHash('sha256')
          .update(body.password)
          .digest('hex'),
      })
      res.status(200).json(updatedData)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  delete = async (req: Request, res: Response) => {
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

  auth = async (req: Request, res: Response) => {
    try {
      const body = req.body as Auth
      if (body.email === undefined || body.password === undefined)
        return res.sendStatus(400)
      const dbUser = await this.service.findByEmail(body.email)

      const pwdHash = crypto
        .createHash('sha256')
        .update(body.password)
        .digest('hex')

      if (pwdHash === dbUser!.passwordHash) {
        return res.send({
          token: jwt.sign(
            { sub: body.email, exp: Math.floor(Date.now() / 1000 + 60 * 100) },
            process.env.SECRET_KEY as string
          ),
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

