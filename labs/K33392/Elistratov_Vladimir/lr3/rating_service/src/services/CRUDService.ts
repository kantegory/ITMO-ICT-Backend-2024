import { Model } from "sequelize-typescript";
import { Identifier } from "sequelize";
import { RatingAdd } from "../models/rating/Rating";

export interface BasicCrudInterface<ID extends Identifier, E extends Model, ATTR> {
    findById(id: ID): Promise<E | null>;
    addRating(id: number, data: RatingAdd): void
}