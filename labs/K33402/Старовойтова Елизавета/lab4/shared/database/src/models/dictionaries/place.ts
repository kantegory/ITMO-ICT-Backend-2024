import BaseDictionary from "./base";
import {Table} from "sequelize-typescript";

@Table({
    tableName: 'places'
})
class Place extends BaseDictionary {}

export default Place