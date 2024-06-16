import { Table, Model, AutoIncrement, PrimaryKey, Unique, BeforeCreate, BeforeUpdate, Column, BelongsTo, HasMany, ForeignKey, Default } from "sequelize-typescript";
import bcrypt from "bcrypt";

export @Table
class Role extends Model {
    @PrimaryKey
    @Column
    name!: string;
}

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

    @ForeignKey(() => Role)
    @Column
    role_name!: string;

    @Default(false)
    @Column
    if_participating!: boolean;
    
    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
        }
    }
}


