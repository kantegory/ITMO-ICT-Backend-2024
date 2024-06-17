import { Identifier } from "sequelize";
import { Hotel, HotelCreate } from "../../models/hotel/Hotel";
import { BasicCrudInterface } from "../CRUDService";

export interface CrudHotelInterface<CITY_ID extends Identifier> extends BasicCrudInterface<number, Hotel, HotelCreate>{
    findById(id: number): Promise<Hotel | null>;
    create(data: HotelCreate): Promise<Hotel>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: HotelCreate): Promise<Hotel>;
    findAll(): Promise<Array<Hotel> | null>;
    findAllByCityId(user_id: CITY_ID): Promise<Array<Hotel> | null>;
}