import { Model } from "sequelize-typescript";
import { Identifier } from "sequelize";

export interface CrudService<ID extends Identifier, E extends Model, ATTR> {
    findById(id: ID): Promise<E | null>;
    create(data: ATTR): Promise<E>;
    deleteById(id: ID): Promise<ID>;
    updateById(id: ID, data: ATTR): Promise<E>;
    getAll(): Promise<Array<E> | null>;
}