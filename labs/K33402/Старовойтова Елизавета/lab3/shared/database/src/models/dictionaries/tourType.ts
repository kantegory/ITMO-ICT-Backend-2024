import BaseDictionary from "./base";
import {Table} from "sequelize-typescript";

@Table({
    tableName: 'tour_types'
})
class TourType extends BaseDictionary {}

export default TourType