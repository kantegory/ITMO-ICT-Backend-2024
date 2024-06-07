import { Table, Model, Column, PrimaryKey, BelongsTo, ForeignKey, AutoIncrement } from "sequelize-typescript";
import { Team } from "./team";

@Table
export class Solution extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Team)
    @Column
    team_id!: number;

    @Column
    solution_link!: string;

    @Column
    submission_date!: Date;

    @BelongsTo(() => Team)
    team!: Team;
}


@Table
export class Grading extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    user_id!: number;

    @ForeignKey(() => Solution)
    @Column
    solution_id!: number;

    @Column
    points!: number;

    @Column
    comment?: string;
}

