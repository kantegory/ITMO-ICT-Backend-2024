import { Model } from 'sequelize-typescript'
import { IService } from '../../services/base/index.js'

export class BaseController<T extends Model> {
  protected service: IService<T>

  constructor(service: IService<T>) {
    this.service = service
  }

  async get(req: any, res: any) {
    try {
      const data = await this.service.findByPk(req.params.pk)
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

  async post(req: any, res: any) {
    try {
      const newData = await this.service.create(req.body)
      res.status(201).json(newData)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async put(req: any, res: any) {
    try {
      const pk = req.params.pk
      const updatedData = await this.service.updateByPk(pk, req.body)
      res.status(200).json(updatedData)
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async delete(req: any, res: any) {
    try {
      const pk = req.params.pk
      const deletedCount = await this.service.deleteByPk(pk)
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

