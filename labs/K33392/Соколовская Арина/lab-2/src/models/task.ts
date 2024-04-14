import { Table, Model, Column, PrimaryKey } from 'sequelize-typescript';


@Table
export class Task extends Model {
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    start_datetime!: Date;

    @Column
    end_datetime!: Date;
}

@Table
export class Link extends Model {
    @PrimaryKey
    @Column
    id!: number;

    @Column
    url!: string;

    @Column
    description?: string;

    @Column
    task_id!: number;
}

@Table
export class File extends Model {
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    task_id!: number;
}