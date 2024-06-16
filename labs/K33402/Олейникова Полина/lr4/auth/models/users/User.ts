import hashPassword from '../../utils/hashPassword'
import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, DataType, AutoIncrement, PrimaryKey, Scopes } from 'sequelize-typescript'
import { Optional } from "sequelize";

export type UserAttributes = {
    id: number;
    name: string,
    email: string;
    role: RoleType;
    password: string;
};

export enum RoleType {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    USER = "USER",
};

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;


@Scopes({ 'withoutPassword': {
    attributes: { exclude: ['password'] },
}})
@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
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

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance
        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }
}

export default User

