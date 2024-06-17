import { Identifier } from "sequelize/types/model";
import { TravelUserLink, TravelUserLinkCreate } from "../../../models/links/TravelUserLink";
import { BasicCrudInterface } from "../../CRUDService";

export interface CrudTravelUserLinkInterface<USER_ID extends Identifier, TRAVEL_ID extends Identifier> extends BasicCrudInterface<number, TravelUserLink, TravelUserLinkCreate>{
    findById(id: number): Promise<TravelUserLink | null>;
    findByUserId(user_id: USER_ID): Promise<TravelUserLink | null>;
    findByTravelId(travel_id: TRAVEL_ID): Promise<TravelUserLink | null>;
    create(data: TravelUserLinkCreate): Promise<TravelUserLink>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: TravelUserLinkCreate): Promise<TravelUserLink>;
    findAll(): Promise<Array<TravelUserLink> | null>;
}