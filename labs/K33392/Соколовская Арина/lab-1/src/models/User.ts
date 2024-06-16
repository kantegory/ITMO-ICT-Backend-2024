import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import bcrypt from "bcrypt";


export @Table
class User extends Model {

   @PrimaryKey
   @AutoIncrement
   @Column
    id: number;
    
    @Unique
    @Column
    nickname: string

    @Column
    name: string

    @Unique
    @Column
    email: string


    @Unique
    @Column
    phone: string

    @Column
    password: string;

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
        }
    }
}


