import { Identifier } from "sequelize/types/model";
import { UserComment, UserCommentCreate } from "../../../models/comment/UserComment";
import { BasicCrudInterface } from "../../CRUDService";

export interface CrudUserCommentInterface<USER_ID extends Identifier> extends BasicCrudInterface<number, UserComment, UserCommentCreate>{
    findById(id: number): Promise<UserComment | null>;
    findByUserId(user_id: USER_ID): Promise<Array<UserComment> | null>;
    create(data: UserCommentCreate): Promise<UserComment>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: UserCommentCreate): Promise<UserComment>;
    findAll(): Promise<Array<UserComment> | null>;
}