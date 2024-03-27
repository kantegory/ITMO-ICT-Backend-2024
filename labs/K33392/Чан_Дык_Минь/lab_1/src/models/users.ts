import { Table, Model, Column, DataType, AllowNull, BeforeCreate, BeforeUpdate, Unique } from "sequelize-typescript";
import { Optional } from "sequelize";
import bcrypt from  "bcrypt"; 

export type UserAttributes = {
    id: number,
    username: string,
    email: string,
    password: string
}

export interface AuthResult {
    username: string;
    token: string;
}

export type UserLogin = {
    username: string,
    password: string
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

@Table({
    timestamps: false,
    tableName: "users"
})

export class Users extends Model<UserAttributes, UserCreationAttributes> {
    
    @AllowNull(false)
    @Column(DataType.STRING)
    username!: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    email!: string;


    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;

    @BeforeUpdate
    @BeforeCreate
    static hashPassword(instance: Users): void {
        const {password} = instance;

        if (instance.changed('password')) {
            instance.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        };
    }
}

