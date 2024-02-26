import {AllowNull, Column, Model, Table, Unique} from "sequelize-typescript";
import {Optional} from "sequelize";


export type UserAttributes = {
    id: number,
    name: string,
    email: string,
    password: string
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;


@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column
    name: string;

    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;
}
