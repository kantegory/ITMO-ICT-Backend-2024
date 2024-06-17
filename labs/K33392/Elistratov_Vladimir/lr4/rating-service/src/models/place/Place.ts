import {
    Table,
    Column,
    Model,
} from "sequelize-typescript"
import { Optional } from "sequelize";

export type PlaceAttributes = {
    id: number,
    rating: number,
    amount_of_rates: number,
}

export type PlaceCreate = Optional<PlaceAttributes, "id">

@Table
export class Place extends Model<PlaceAttributes, PlaceCreate> {
    @Column
    rating!: number

    @Column
    amount_of_rates!: number
}

export default Place