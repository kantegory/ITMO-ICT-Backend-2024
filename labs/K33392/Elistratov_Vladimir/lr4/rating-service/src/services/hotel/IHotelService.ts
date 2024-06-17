import { Identifier } from "sequelize";
import { Hotel, HotelCreate } from "../../models/hotel/Hotel";
import { BasicCrudInterface } from "../CRUDService";
import { RatingAdd } from "../../models/rating/Rating";

export interface CrudHotelInterface<CITY_ID extends Identifier> extends BasicCrudInterface<number, Hotel, HotelCreate>{
    findById(id: number): Promise<Hotel | null>;
    addRating(id: number, data: RatingAdd): void
}