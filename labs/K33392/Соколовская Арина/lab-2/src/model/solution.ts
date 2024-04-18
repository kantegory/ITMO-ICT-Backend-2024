import { Table, Model, Column, PrimaryKey, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Team } from "./team";
import { Jury } from "./user";

@Table
export class Solution extends Model {
    @PrimaryKey
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
    @Column
    id!: number;

    @ForeignKey(() => Jury)
    @Column
    jury_id!: number;

    @ForeignKey(() => Solution)
    @Column
    solution_id!: number;

    @Column
    points!: number;

    @Column
    comment?: string;
}

