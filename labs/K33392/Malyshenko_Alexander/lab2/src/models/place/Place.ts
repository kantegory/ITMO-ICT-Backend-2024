import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey
} from "sequelize-typescript"
import { Optional } from "sequelize";
import City from "../city/City";

export type PlaceAttributes = {
    id: number,
    city_id: number,
    name: string,
    description: string,
    rating: number,
    amount_of_rates: number,
}

export type PlaceCreate = Optional<PlaceAttributes, "id">

@Table
export class Place extends Model<PlaceAttributes, PlaceCreate> {
    @ForeignKey(() => City)
    @AllowNull(false)
    @Column
    city_id!: number

    @AllowNull(false)
    @Column
    name!: string

    @Column
    description!: string

    @Column
    rating!: number

    @Column
    amount_of_rates!: number
}

export default Place