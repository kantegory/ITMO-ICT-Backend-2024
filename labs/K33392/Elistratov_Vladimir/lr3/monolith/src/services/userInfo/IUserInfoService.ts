import { Identifier } from "sequelize/types/model";
import { UserInfo, UserInfoCreate } from "../../models/userInfo/UserInfo";
import { BasicCrudInterface } from "../CRUDService";

export interface CrudUserInfoInterface<USER_ID extends Identifier> extends BasicCrudInterface<number, UserInfo, UserInfoCreate>{
    findById(id: number): Promise<UserInfo | null>;
    findByUserId(user_id: USER_ID): Promise<UserInfo | null>;
    create(data: UserInfoCreate): Promise<UserInfo>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: UserInfoCreate): Promise<UserInfo>;
    findAll(): Promise<Array<UserInfo> | null>;
}