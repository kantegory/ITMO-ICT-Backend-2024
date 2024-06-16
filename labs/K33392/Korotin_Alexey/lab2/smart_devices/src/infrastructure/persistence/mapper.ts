import {Entity} from "../../domain/meta";
import {Model} from "sequelize-typescript";

export interface Mapper<E extends Entity<any>, M extends Model> {
    toEntity(model: M): E;
    toModel(entity: E): M;
}