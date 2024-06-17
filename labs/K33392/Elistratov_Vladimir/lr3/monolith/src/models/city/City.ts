import { Table, Column, Model, AllowNull, Unique, BeforeCreate, BeforeUpdate, ForeignKey, Length } from "sequelize-typescript"
import { Optional } from "sequelize";
import Country from "../country/Country";

export type CityAttributes = {
    id: number,
    country_id: number,
    name: string,
    description: string
}

export type CityCreate = Optional<CityAttributes, "id">

@Table
export class City extends Model<CityAttributes, CityCreate> {
    @ForeignKey(() => Country)
    @AllowNull(false)
    @Column
    country_id!: number

    @Unique
    @AllowNull(false)
    @Column
    name!: string

    @AllowNull(true)
    @Column
    description!: string

}

export default City