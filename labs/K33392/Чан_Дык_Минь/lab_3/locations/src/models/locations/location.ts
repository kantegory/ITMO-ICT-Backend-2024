import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';
import { Optional } from "sequelize";
export interface LocationAttributes {
  id: string;
  name: string;
  address: string;
  rating: number;
  activities : any;
}

export type LocationCreationAttributes = Optional<LocationAttributes, 'id'>;

@Table
export class Location extends Model<LocationAttributes, LocationCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  name: string;

  @Column
  address: string;

  @Column({
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING), // Define the data type for activities
  })
  activities: string[]; // Assuming activities is an array of strings
}

export default Location;
