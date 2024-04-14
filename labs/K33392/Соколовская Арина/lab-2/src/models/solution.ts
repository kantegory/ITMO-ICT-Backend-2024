import { Table, Model, Column, PrimaryKey, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Team } from "./team";

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

    @Column
    jury_id!: number;

    @Column
    solution_id!: number;

    @Column
    points!: number;

    @Column
    comment?: string;
}

