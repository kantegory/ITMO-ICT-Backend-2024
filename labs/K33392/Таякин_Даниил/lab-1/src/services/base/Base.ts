import { Model, ModelCtor } from 'sequelize-typescript'

export interface IService<T extends Model> {
    create(data: object): Promise<T>
    getById(id: number): Promise<T | null>
    updateById(id: number, data: object): Promise<[affectedCount: number]>
    deleteById(id: number): Promise<number>
}

export class BaseService<T extends Model> implements IService<T> {
    protected model: ModelCtor<T>
  
    constructor(model: ModelCtor<T>) {
        this.model = model
    }
  
    create = async (data: any): Promise<T> => {
        return (await this.model.create(data)) as T
    }
  
    getById = async (id: number): Promise<T | null> => {
        return (await this.model.findByPk(id)) as T | null
    }
  
    updateById = async (id: any, data: any): Promise<[affectedCount: number]> => {
        return await this.model.update(data, { where: { id: id } })
    }
  
    deleteById = async (id: any): Promise<number> => {
        return await this.model.destroy({ where: { id: id } })
    }
  }