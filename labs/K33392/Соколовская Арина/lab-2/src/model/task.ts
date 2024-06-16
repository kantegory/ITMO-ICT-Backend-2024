import { Table, Model, Column, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import { Jury } from './user';


@Table
export class Hackathon extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    task!: string;

    @Column
    start_datetime!: Date;

    @Column
    end_datetime!: Date;
}

@Table
export class Link extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    url!: string;

    @Column
    description?: string;

    @ForeignKey(() => Hackathon)
    @Column
    task_id!: number;
}

@Table
export class File extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @ForeignKey(() => Hackathon)
    @Column
    task_id!: number;
}

@Table
export class HackathonJury extends Model {
    @PrimaryKey
    @ForeignKey(() => Hackathon)
    @Column
    hackathon_id!: number;

    @PrimaryKey
    @ForeignKey(() => Jury)
    @Column
    jury_id!: number;
}