import { Identifier } from "sequelize/types/model";
import { HotelComment, HotelCommentCreate } from "../../../models/comment/HotelComment";
import { BasicCrudInterface } from "../../CRUDService";

export interface CrudHotelCommentInterface<HOTEL_ID extends Identifier> extends BasicCrudInterface<number, HotelComment, HotelCommentCreate>{
    findById(id: number): Promise<HotelComment | null>;
    findByHotelId(hotel_id: HOTEL_ID): Promise<HotelComment | null>;
    create(data: HotelCommentCreate): Promise<HotelComment>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: HotelCommentCreate): Promise<HotelComment>;
    findAll(): Promise<Array<HotelComment> | null>;
}