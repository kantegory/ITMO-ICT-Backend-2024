import { DogCreationError, DogNotFound } from '../../errors/dogs/Dog.js'
import { Dog } from '../../models/dogs/Dog.js'

export class DogsService {
  async create(data: any): Promise<Dog> {
    try {
      const dog = await Dog.create(data)

      return dog.toJSON()
    } catch (e: any) {
      const errors = e.errors.map((error: any) => error.message)

      throw new DogCreationError(errors)
    }
  }

  async get(id: number): Promise<Dog> {
    const dog = await Dog.findByPk(id)
      
    if (dog) return dog.toJSON()
      
    throw new DogNotFound(`Dog with id ${id} was not found`)
  }
}
