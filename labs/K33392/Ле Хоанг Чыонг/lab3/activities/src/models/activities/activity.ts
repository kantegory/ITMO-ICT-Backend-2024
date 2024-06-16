import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsToMany } from 'sequelize-typescript';

import { Optional } from "sequelize";

export interface ActivityAttributes {
  id: string;
  name: string;
}

export type ActivityCreationAttributes = Optional<ActivityAttributes, 'id'>;

@Table
export class Activity extends Model<ActivityAttributes, ActivityCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  name: string;

}