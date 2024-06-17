import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey
} from "sequelize-typescript"
import { Optional } from "sequelize";
import User from "../user/User";

export type UserCommentAttributes = {
    id: number,
    entity_id: number,
    title: string,
    main_info: string,
    rating: number,
}

export type UserCommentCreate = Optional<UserCommentAttributes, "id">

@Table
export class UserComment extends Model<UserCommentAttributes, UserCommentCreate> {
    @ForeignKey(() => User)
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

export default UserComment