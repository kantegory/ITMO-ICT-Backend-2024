import { Request, Response } from 'express'
import { Model } from 'sequelize-typescript'
import { IService } from '../../services/base/Base.js'

export class BaseController<T extends Model> {
    protected service: IService<T>

    get = async (req: Request, res: Response) => {
        try {
            const data = await this.service.getById(+req.params.pk)
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
            res.status(201).send(await this.service.create(req.body))
        } catch (error) {
            console.error('Error:', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    put = async (req: Request, res: Response) => {
        try {
          const updatedData = await this.service.updateById(
            +req.params.pk,
            req.body
          )
          res.status(200).json(updatedData)
        } catch (error) {
          console.error('Error:', error)
          res.status(500).json({ error: 'Internal Server Error' })
        }
      }
    
    delete = async (req: Request, res: Response) => {
        try {
            const deletedCount = await this.service.deleteById(+req.params.pk)
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
