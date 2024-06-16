import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import User from '../users/user';
import Location from '../locations/location'
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

  @BelongsToMany(() => User, () => UserActivity)
  users: User[];
}

@Table
export class UserActivity extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;


  @ForeignKey(() => Activity)
  @Column
  activity_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  user_id: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.UUID,
  })
  location_id: string;
}


@Table
export class LocationActivity extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;


  @ForeignKey(() => Activity)
  @Column({
    type: DataType.UUID,
  })
  activity_id: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.UUID,
  })
  location_id: string;
}

// export default {UserActivity,LocationActivity,Activity}