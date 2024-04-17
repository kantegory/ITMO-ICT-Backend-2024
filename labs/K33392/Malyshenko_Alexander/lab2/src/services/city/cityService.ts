import sequelize from "../../database/database"
import { City, CityCreate } from "../../models/city/City"
import { Repository } from "sequelize-typescript"
import { CrudCityInterface } from "./ICityService"


class CityService implements CrudCityInterface<number> {
    private cityRepository: Repository<City> = sequelize.getRepository(City)
    create(data: CityCreate): Promise<City> {
        try {
            return this.cityRepository.create(data)
        } catch (e: any) {
            return Promise.reject(e)
        }
    }

    deleteById(id: number): Promise<number> {
        return this.cityRepository.destroy({
            where: {
                id: id
            }
        })
    }

    async findById(id: number): Promise<City | null> {
        return this.cityRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async findAll(): Promise<Array<City> | null> {
        return this.cityRepository.findAll()
    }

    async updateById(id: number, data: CityCreate): Promise<City> {
        const result = await this.cityRepository.update(data, {
            where: {
                id: id
            },
            returning: true
        })

        if (result[0] === 0) {
            return Promise.reject({message: "Not found"})
        }

        return Promise.resolve(result[1][0])
    }

    async findByCountryId(country_id: number): Promise<City | null> {
        return this.cityRepository.findOne({
            where: {
                country_id: country_id
            }
        })
    }
}

export default CityService