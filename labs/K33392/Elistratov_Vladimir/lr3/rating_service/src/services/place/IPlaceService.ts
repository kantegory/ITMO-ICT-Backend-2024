import { Identifier } from "sequelize";
import { Place, PlaceCreate } from "../../models/place/Place";
import { BasicCrudInterface } from "../CRUDService";
import { RatingAdd } from "../../models/rating/Rating";

export interface CrudPlaceInterface<CITY_ID extends Identifier> extends BasicCrudInterface<number, Place, PlaceCreate>{
    findById(id: number): Promise<Place | null>;
    addRating(id: number, data: RatingAdd): void
}