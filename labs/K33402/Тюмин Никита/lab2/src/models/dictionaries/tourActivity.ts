import BaseDictionary from "./base";
import {Table} from "sequelize-typescript";

@Table({
    tableName: 'tour_activities'
})
class TourActivity extends BaseDictionary {}

export default TourActivity