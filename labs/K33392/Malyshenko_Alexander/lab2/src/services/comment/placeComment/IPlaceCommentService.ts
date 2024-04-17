import { Identifier } from "sequelize/types/model";
import { PlaceComment, PlaceCommentCreate } from "../../../models/comment/PlaceComment";
import { BasicCrudInterface } from "../../CRUDService";

export interface CrudPlaceCommentInterface<PLACE_ID extends Identifier> extends BasicCrudInterface<number, PlaceComment, PlaceCommentCreate>{
    findById(id: number): Promise<PlaceComment | null>;
    findByPlaceId(place_id: PLACE_ID): Promise<PlaceComment | null>;
    create(data: PlaceCommentCreate): Promise<PlaceComment>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: PlaceCommentCreate): Promise<PlaceComment>;
    findAll(): Promise<Array<PlaceComment> | null>;
}