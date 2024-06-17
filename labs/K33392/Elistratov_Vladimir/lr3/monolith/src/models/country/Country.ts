import { Table, Column, Model, AllowNull, Unique, BeforeCreate, BeforeUpdate } from "sequelize-typescript"
import { Optional } from "sequelize";

export type CountryAttributes = {
    id: number,
    name: string,
    main_language: string,
}

export type CountryCreate = Optional<CountryAttributes, "id">

@Table
export class Country extends Model<CountryAttributes, CountryCreate> {
    @Unique
    @AllowNull(false)
    @Column
    name!: string

    @AllowNull(false)
    @Column
    main_language!: string
}

export default Country