import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey
} from "sequelize-typescript"
import { Optional } from "sequelize";
import Place from "../place/Place";

export type PlaceCommentAttributes = {
    id: number,
    entity_id: number,
    title: string,
    main_info: string,
    rating: number,
}

export type PlaceCommentCreate = Optional<PlaceCommentAttributes, "id">

@Table
export class PlaceComment extends Model<PlaceCommentAttributes, PlaceCommentCreate> {
    @ForeignKey(() => Place)
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

export default PlaceComment