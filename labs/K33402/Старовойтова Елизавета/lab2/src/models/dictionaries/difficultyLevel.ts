import BaseDictionary from "./base";
import {Table} from "sequelize-typescript";

@Table({
    tableName: 'difficulty_levels'
})
class DifficultyLevel extends BaseDictionary {}

export default DifficultyLevel