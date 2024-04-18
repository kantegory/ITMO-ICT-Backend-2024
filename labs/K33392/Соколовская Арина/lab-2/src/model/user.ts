import { Table, Model, AutoIncrement, PrimaryKey, Unique, BeforeCreate, BeforeUpdate, Column, BelongsTo, HasMany, ForeignKey } from "sequelize-typescript";
import bcrypt from "bcrypt";
import { Hackathon } from "./task";

export @Table
class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    surname!: string;

    @Column
    email!: string;

    @Column
    password!: string;

    @Column
    about?: string;

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
        }
    }
}


export @Table
class Jury extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => User) 
    @Column
    user_id!: number;

    @BelongsTo(() => User)
    user!: User;
}

export @Table
class Curator extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
    
    @ForeignKey(() => Hackathon)
    @Column
    task_id!: number;

    @ForeignKey(() => User)
    @Column
    user_id!: number;
}
