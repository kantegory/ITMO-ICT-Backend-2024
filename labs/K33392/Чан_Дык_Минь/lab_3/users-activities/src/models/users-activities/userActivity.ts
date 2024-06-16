import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

import { Optional } from "sequelize";

export interface UserActivityAttributes {
  id: string;
  name: string;
}

export type UserActivityCreationAttributes = Optional<UserActivityAttributes, 'id'>;

@Table
export class UserActivity extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;


  @Column({
    type: DataType.UUID,
  })
  activityId: string;

  @Column({
    type: DataType.UUID,
  })
  userId: string;
}