import {AllowNull, BeforeCreate, BeforeUpdate, Column, Model, Table, Unique} from "sequelize-typescript";
import {Optional} from "sequelize";
import bcrypt from "bcrypt";


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

    @BeforeUpdate
    @BeforeCreate
    static hashPassword(instance: User): void {
        const {password} = instance;
        if (instance.changed('password')) {
            instance.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        }
    }
}
