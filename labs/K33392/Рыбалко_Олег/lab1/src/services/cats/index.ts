import { CatCreationError, CatNotFound } from '../../errors/cats/index.js'
import { Cat } from '../../models/cats/index.js'

export class CatsService {
  async create(catData: any): Promise<Cat> {
    try {
      return (await Cat.create(catData)).toJSON()
    } catch {
      throw new CatCreationError('failed to create a cat')
    }
  }

  async get(identifier: number): Promise<Cat> {
    try {
      return await Cat.findByPk(identifier)
    } catch {
      throw new CatNotFound(
        `cat with the identifier ${identifier} was not found}`
      )
    }
  }
}

