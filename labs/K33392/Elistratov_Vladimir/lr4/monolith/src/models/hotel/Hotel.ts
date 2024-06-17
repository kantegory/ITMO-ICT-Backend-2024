import { Table, Column, Model, AllowNull, Unique, BeforeCreate, BeforeUpdate, ForeignKey, Default } from "sequelize-typescript"
import { Optional } from "sequelize";
import City from "../city/City";

export type HotelAttributes = {
    id: number,
    city_id: number,
    name: string,
    stars: number,
    rating: number,
    amount_of_rates: number,
}

export type HotelCreate = Optional<HotelAttributes, "id">

@Table
export class Hotel extends Model<HotelAttributes, HotelCreate> {
    @ForeignKey(() => City)
    @AllowNull(false)
    @Column
    city_id!: number

    @AllowNull(false)
    @Column
    name!: string

    @AllowNull(false)
    @Column
    stars!: number

    @AllowNull(true)
    @Column
    rating!: number

    @AllowNull(true)
    @Column
    amount_of_rates!: number
}

export default Hotel