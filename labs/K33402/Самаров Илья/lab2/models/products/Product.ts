import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
} from "sequelize-typescript";
import { Optional } from "sequelize";

export type ProductAttributes = {
  id: Number;
  name: string;
  price: Number;
  count: Number;
  sale: string;
};

export type ProductCreationAttributes = Optional<ProductAttributes, "id">;

@Table
export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column
  id: Number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  price: Number;

  @AllowNull(false)
  @Column
  count: Number;

  @AllowNull(false)
  @Column
  sale: string;
}

export default Product;
