import { Table, Model, AutoIncrement, Column, PrimaryKey, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./user";
import { Hackathon } from "./task";

export @Table
class Team extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => User) 
    @Column
    leader_id!: number;

    @Column
    name!: string;

    @Column
    description?: string;

    @ForeignKey(() => Hackathon)
    @Column
    task_id!: number;

    @BelongsTo(() => User)
    leader!: User;
}

export @Table
class Participant extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @PrimaryKey
    @ForeignKey(() => Team)
    @Column
    team_id!: number;
}

