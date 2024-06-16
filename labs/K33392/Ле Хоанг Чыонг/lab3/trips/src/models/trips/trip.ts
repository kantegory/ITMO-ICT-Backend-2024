import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, PrimaryKey } from 'sequelize-typescript';
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
  userId: string;
  locations: string[];
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

  @Column
  userId: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: []
  })
  locations: string[];
}


