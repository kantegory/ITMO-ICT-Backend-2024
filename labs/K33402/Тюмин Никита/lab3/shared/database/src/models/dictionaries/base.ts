import {
    Column,
} from 'sequelize-typescript'
import BaseModel from "../base";

class BaseDictionary extends BaseModel {
    @Column
    name: string
}

export default BaseDictionary