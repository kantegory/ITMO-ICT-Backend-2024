import {Table, Column, Model, ForeignKey, AllowNull, BelongsToMany} from "sequelize-typescript"
import { Optional } from "sequelize";
import User from "../user/User";
import City from "../city/City";
import TravelUserLink from "../links/TravelUserLink";
import Transport from "../transport/Transport";

export type TravelAttributes = {
    id: number,
    user_id: number,
    transport_id: number,
    departure_city: string,
    destination_city: string,
    departure_date: string,
    expected_arrival_date: string,
    actual_arrival_date: string,
    state: string,
    seats: string,
}

export type TravelCreate = Optional<TravelAttributes, "id">

@Table
export class Travel extends Model<TravelAttributes, TravelCreate> {
    @ForeignKey(() => Transport)
    @Column
    transport_id!: number

    @ForeignKey(() => User)
    @Column
    user_id!: number

    @ForeignKey(() => City)
    @Column
    departure_city!: string

    @ForeignKey(() => City)
    @Column
    destination_city!: string

    @AllowNull(false)
    @Column
    departure_date!: number

    @AllowNull(false)
    @Column
    expected_arrival_date!: number

    @Column
    actual_arrival_date!: number

    @Column
    state!: string

    @Column
    seats!: string

    @BelongsToMany(() => User, () => TravelUserLink)
    travels!: User[]
}

export default Travel