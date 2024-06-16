import BaseDictionary from "./base";
import {Table} from "sequelize-typescript";

@Table({
    tableName: 'comfort_levels'
})
class ComfortLevel extends BaseDictionary {}

export default ComfortLevel