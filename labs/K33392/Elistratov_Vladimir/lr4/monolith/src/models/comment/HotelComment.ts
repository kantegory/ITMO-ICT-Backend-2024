import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey
} from "sequelize-typescript"
import { Optional } from "sequelize";
import Hotel from "../hotel/Hotel";

export type HotelCommentAttributes = {
    id: number,
    entity_id: number,
    title: string,
    main_info: string,
    rating: number,
}

export type HotelCommentCreate = Optional<HotelCommentAttributes, "id">

@Table
export class HotelComment extends Model<HotelCommentAttributes, HotelCommentCreate> {
    @ForeignKey(() => Hotel)
    @AllowNull(false)
    @Column
    entity_id!: number

    @AllowNull(false)
    @Column
    title!: string

    @Column
    main_info!: string

    @Column
    rating!: number
}

export default HotelComment