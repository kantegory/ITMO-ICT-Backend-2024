import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Brand extends Model<Brand> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  name!: string;
}

export default Brand;
