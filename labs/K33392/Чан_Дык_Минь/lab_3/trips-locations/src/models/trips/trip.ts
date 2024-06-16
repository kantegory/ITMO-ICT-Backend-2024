import { Table, Column, Model, DataType, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';


export interface TripLocationAttributes {
  id: string;
  tripId: string;
  locationId: string;
}

export type TripLocationCreationAttributes = Optional<TripLocationAttributes, 'id'>;

@Table
export class TripLocation extends Model<TripLocationAttributes,TripLocationCreationAttributes> {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.UUID,
  })
  tripId: string;

  @Column({
    type: DataType.UUID,
  })
  locationId: string;
}
