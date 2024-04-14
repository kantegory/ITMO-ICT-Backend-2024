import { Table, Model, AutoIncrement, Column, PrimaryKey, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./user";

export @Table
class Team extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    @ForeignKey(() => User) 
    leader_id!: number;

    @Column
    name!: string;

    @Column
    description?: string;

    @Column
    task_id!: number;

    @BelongsTo(() => User)
    leader!: User;
}

export @Table
class Participant extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @PrimaryKey
    @Column
    team_id!: number;
}

