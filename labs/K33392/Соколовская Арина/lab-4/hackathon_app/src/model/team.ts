import { Table, Model, AutoIncrement, Column, PrimaryKey, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Hackathon } from "./task";

export @Table
class Team extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    leader_id!: number;

    @Column
    name!: string;

    @Column
    description?: string;

    @ForeignKey(() => Hackathon)
    @Column
    task_id!: number;
}

export @Table
class Participant extends Model {
    @PrimaryKey
    @Column
    user_id!: number;

    @PrimaryKey
    @ForeignKey(() => Team)
    @Column
    team_id!: number;
}

