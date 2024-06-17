import { City, CityCreate } from "../../models/city/City"
import { BasicCrudInterface } from "../CRUDService"
import Country from "../../models/country/Country"
import {Identifier} from "sequelize"

export interface CrudCityInterface<COUNTRY_ID extends Identifier> extends BasicCrudInterface<number, City, CityCreate>{
    findById(id: number): Promise<City | null>
    create(data: CityCreate): Promise<City>
    deleteById(id: number): Promise<number>
    updateById(id: number, data: CityCreate): Promise<City>
    findAll(): Promise<Array<City> | null>
    findByCountryId(id: COUNTRY_ID): Promise<Array<City> | null>
}