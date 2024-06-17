import { Table, Column, Model, AllowNull, ForeignKey } from "sequelize-typescript"
import { Optional } from "sequelize";

export type HotelAttributes = {
    id: number,
    rating: number,
    amount_of_rates: number,
}

export type HotelCreate = Optional<HotelAttributes, "id">

@Table
export class Hotel extends Model<HotelAttributes, HotelCreate> {
    @AllowNull(true)
    @Column
    rating!: number

    @AllowNull(true)
    @Column
    amount_of_rates!: number
}

export default Hotel