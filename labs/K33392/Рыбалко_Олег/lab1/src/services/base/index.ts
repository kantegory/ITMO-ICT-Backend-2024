import { Model, ModelCtor } from 'sequelize-typescript'

export interface IService<T extends Model> {
  create(data: object): Promise<T>
  findByPk(pk: number): Promise<T | null>
  updateByPk(pk: number, data: object): Promise<[affectedCount: number]>
  deleteByPk(pk: number): Promise<number>
}

export class BaseService<T extends Model> implements IService<T> {
  protected model: ModelCtor<T>

  constructor(model: ModelCtor<T>) {
    this.model = model
  }

  async create(data: any): Promise<T> {
    return (await this.model.create(data)) as T
  }

  async findByPk(pk: number): Promise<T | null> {
    return (await this.model.findByPk(pk)) as T | null
  }

  async updateByPk(pk: any, data: any): Promise<[affectedCount: number]> {
    return await this.model.update(data, { where: { id: pk } })
  }

  async deleteByPk(pk: any): Promise<number> {
    return await this.model.destroy({ where: { id: pk } })
  }
}

