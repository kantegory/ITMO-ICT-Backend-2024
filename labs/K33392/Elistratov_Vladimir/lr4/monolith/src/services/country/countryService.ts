import sequelize from "../../database/database";
import { Country, CountryCreate } from "../../models/country/Country";
import { Repository } from "sequelize-typescript";
import { CrudCountryInterface } from "./ICountryService";


class CountryService implements CrudCountryInterface {
    private countryRepository: Repository<Country> = sequelize.getRepository(Country);
    create(data: CountryCreate): Promise<Country> {
        try {
            return this.countryRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.countryRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<Country | null> {
        return this.countryRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findAll(): Promise<Array<Country> | null> {
        return this.countryRepository.findAll()
    }

    async updateById(id: number, data: CountryCreate): Promise<Country> {
        const result = await this.countryRepository.update(data, {
            where: {
                id: id
            },
            returning: true
        });

        if (result[0] === 0) {
            return Promise.reject({message: "Not found"});
        }

        return Promise.resolve(result[1][0]);
    }
}

export default CountryService;