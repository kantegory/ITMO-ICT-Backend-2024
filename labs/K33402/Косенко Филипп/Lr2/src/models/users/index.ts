import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, DataType, HasMany, AutoIncrement, PrimaryKey, Scopes } from 'sequelize-typescript'
import { Optional } from "sequelize";

export type UserAtributes = {
    id: number;
    name: string;
    email: string;
    role: RoleType;
    password: string;
};

export enum RoleType {
    ADMIN = "ADMIN",
    USER = "USER"
};

export type UserCreationAttributes = Optional<UserAtributes, 'id'>;

@Table
export class User extends Model<UserAtributes, UserCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Unique
    @Column
    email: string


    @Column({
        type: DataType.ENUM(...Object.values(RoleType)),
        defaultValue: RoleType.USER,
    })
    role: RoleType;

    @AllowNull(false)
    @Column
    password: string
}

export default User
