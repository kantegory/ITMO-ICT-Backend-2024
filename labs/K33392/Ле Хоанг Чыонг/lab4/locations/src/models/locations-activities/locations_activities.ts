import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Optional } from "sequelize";

export interface LocationActivityAttributes {
  id: string;
  activityId: string;
  locationId: string;
}

export type LocationActivityCreationAttributes = Optional<LocationActivityAttributes, 'id'>;

@Table
export class LocationActivity extends Model<LocationActivityAttributes, LocationActivityCreationAttributes> {

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
  locationId: string;
}
