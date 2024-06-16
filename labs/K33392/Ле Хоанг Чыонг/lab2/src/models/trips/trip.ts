import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, PrimaryKey } from 'sequelize-typescript';
import User from '../users/user';
import Location from '../locations/location';
import { Optional } from 'sequelize';

export enum TripType {
  VACATION = 'vacation',
  BUSINESS = 'business',
  ADVENTURE = 'adventure',
  OTHER = 'other',
}

export interface TripAttributes {
  id: string;
  name: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  budget: number;
  type: TripType;
  userId: string; // Foreign key for User
}

export type TripCreationAttributes = Optional<TripAttributes, 'id'>;

@Table
export class Trip extends Model<TripAttributes, TripCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column({ type: DataType.DATE })
  dateStart: Date;

  @Column({ type: DataType.DATE })
  dateEnd: Date;

  @Column
  budget: number;

  @Column({
    type: DataType.ENUM(...Object.values(TripType)),
  })
  type: TripType;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Location, () => TripLocation)
    locations: Location[];
}


@Table
export class TripLocation extends Model {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;


  @ForeignKey(() => Trip)
  @Column({
    type: DataType.UUID,
  })
  trip_id: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.UUID,
  })
  location_id: string;
}

