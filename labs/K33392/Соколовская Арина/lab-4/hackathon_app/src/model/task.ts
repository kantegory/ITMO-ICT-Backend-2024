import { Table, Model, Column, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';


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
