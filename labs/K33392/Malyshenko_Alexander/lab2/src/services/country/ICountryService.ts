import { Country, CountryCreate } from "../../models/country/Country";
import { BasicCrudInterface } from "../CRUDService";

export interface CrudCountryInterface extends BasicCrudInterface<number, Country, CountryCreate>{
    findById(id: number): Promise<Country | null>;
    create(data: CountryCreate): Promise<Country>;
    deleteById(id: number): Promise<number>;
    updateById(id: number, data: CountryCreate): Promise<Country>;
    findAll(): Promise<Array<Country> | null>;
}