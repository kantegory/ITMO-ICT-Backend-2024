import { Table, Column, Model, ForeignKey } from "sequelize-typescript"
import { Optional } from "sequelize";
import User from "../user/User";
import Travel from "../travel/Travel";

export type TravelUserLinkAttributes = {
    id: number,
    user_id: number,
    travel_id: number,
    seats: number,
    status: string,
}

export type TravelUserLinkCreate = Optional<TravelUserLinkAttributes, "id">

@Table
export class TravelUserLink extends Model<TravelUserLinkAttributes, TravelUserLinkCreate> {
    @ForeignKey(() => User)
    @Column
    user_id!: number

    @ForeignKey(() => Travel)
    @Column
    travel_id!: number

    @Column
    seats!: number

    @Column
    status!: string
}

export default TravelUserLink