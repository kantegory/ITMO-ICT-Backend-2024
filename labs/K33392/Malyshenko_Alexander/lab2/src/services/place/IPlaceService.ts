import { Identifier } from "sequelize";
import { Place, PlaceCreate } from "../../models/place/Place";
import { BasicCrudInterface } from "../CRUDService";

export interface CrudPlaceInterface<CITY_ID extends Identifier> extends BasicCrudInterface<number, Place, PlaceCreate>{
    findById(id: number): Promise<Place | null>;
    create(data: PlaceCreate): Promise<Place>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: PlaceCreate): Promise<Place>;
    findAll(): Promise<Array<Place> | null>;
    findAllByCityId(user_id: CITY_ID): Promise<Array<Place> | null>;
}