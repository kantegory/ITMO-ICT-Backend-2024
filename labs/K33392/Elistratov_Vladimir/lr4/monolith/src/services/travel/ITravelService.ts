import { Identifier } from "sequelize";
import { Travel, TravelCreate } from "../../models/travel/Travel";
import { BasicCrudInterface } from "../CRUDService";

export interface CrudTravelInterface<DEPARTURE_CITY extends Identifier, DESTINATION_CITY extends Identifier> extends BasicCrudInterface<number, Travel, TravelCreate>{
    findById(id: number): Promise<Travel | null>;
    create(data: TravelCreate): Promise<Travel>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: TravelCreate): Promise<Travel>;
    findAll(): Promise<Array<Travel> | null>;
    findAllByDepartureCityId(dep_city_id: DEPARTURE_CITY): Promise<Array<Travel> | null>;
    findAllByDestinationAndDepartureCityId(dep_city_id: DEPARTURE_CITY, dest_city_id: DESTINATION_CITY): Promise<Array<Travel> | null>;
}