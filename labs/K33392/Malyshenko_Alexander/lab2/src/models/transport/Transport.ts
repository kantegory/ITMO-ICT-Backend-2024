import { Table, Column, Model, AllowNull, ForeignKey } from "sequelize-typescript"
import { Optional } from "sequelize";
import User from "../user/User";

export type TransportAttributes = {
    id: number,
    user_id: number,
    name: string,
    type: string,
    seats: number,
}

export type TransportCreate = Optional<TransportAttributes, "id">

@Table
export class Transport extends Model<TransportAttributes, TransportCreate> {
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    user_id!: number

    @AllowNull(false)
    @Column
    name!: string

    @AllowNull(false)
    @Column
    type!: string

    @AllowNull(false)
    @Column
    seats!: number
}

export default Transport