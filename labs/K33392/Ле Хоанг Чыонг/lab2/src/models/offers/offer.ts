import { Table, Column, Model, DataType, ForeignKey, BelongsTo,  PrimaryKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import Location from '../locations/location';

export enum OfferType {
  DISCOUNT = 'discount',
  BOGO = 'buy_one_get_one',
  PACKAGE = 'package',
  OTHER = 'other',
}

export interface OfferAttributes {
  id: string;
  name: string;
  description: string;
  type: OfferType;
  price: number;
  location_id:string;
}

export type OfferCreationAttributes = Optional<OfferAttributes, 'id'>;

@Table
export class Offer extends Model<OfferAttributes, OfferCreationAttributes> {
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

  @Column({
    type: DataType.ENUM(...Object.values(OfferType)),
  })
  type: OfferType;

  @Column
  price: number;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.UUID,
  })
  location_id: string;

  @BelongsTo(() => Location)
  location: Location;
}


export default Offer;
