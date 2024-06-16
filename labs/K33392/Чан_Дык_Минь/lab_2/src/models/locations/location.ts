import { Table, Column, Model, DataType, BelongsToMany, PrimaryKey, HasMany } from 'sequelize-typescript';
import { Optional } from "sequelize";
import {Activity, LocationActivity} from "../activities/activity"
import User from '../users/user';
import {Trip,TripLocation} from "../trips/trip"
import Offer from "../offers/offer"
import Review from "../reviews/review"
export interface LocationAttributes {
  id: string;
  name: string;
  address: string;
  rating: number; // Assuming rating is between 1 and 5
  reviews: Review[];
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

  @BelongsToMany(() => Activity, () => LocationActivity)
    activities: Activity[];
  
  @BelongsToMany(() => Trip, () => TripLocation)
    trips: Trip[];

  @BelongsToMany(() => User, () => Review)
    users: User[];

  @HasMany(() => Offer)
  offers: Offer[];

  @HasMany(() => Review)
  reviews: Review[];

}



export default Location;
