import sequelize from "../../database/database"
import { Travel, TravelCreate } from "../../models/travel/Travel"
import { Repository } from "sequelize-typescript"
import { CrudTravelInterface } from "./ITravelService"


class TravelService implements CrudTravelInterface<number, number> {
    private travelRepository: Repository<Travel> = sequelize.getRepository(Travel)

    create(data: TravelCreate): Promise<Travel> {
        try {
            return this.travelRepository.create(data)
        } catch (e: any) {
            return Promise.reject(e)
        }
    }

    deleteById(id: number): Promise<number> {
        return this.travelRepository.destroy({
            where: {
                id: id
            }
        })
    }

    async findById(id: number): Promise<Travel | null> {
        return this.travelRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async findAll(): Promise<Array<Travel> | null> {
        return this.travelRepository.findAll()
    }

    async findAllByDepartureCityId(dep_city_id: number): Promise<Array<Travel> | null> {
        return this.travelRepository.findAll({
            where: {
                departure_city: dep_city_id
            }
        })
    }

    async findAllByDestinationAndDepartureCityId(dep_city_id: number, dest_city_id: number): Promise<Array<Travel> | null> {
        return this.travelRepository.findAll({
            where: {
                departure_city: dep_city_id,
                destination_city: dep_city_id
            }
        })
    }

    async updateById(id: number, data: TravelCreate): Promise<Travel> {
        const result = await this.travelRepository.update(data, {
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

    async findAllByNumberOfSeats(numberOfSeats: number): Promise<Array<Travel> | null> {
        return this.travelRepository.findAll({
            where: {
                seats: numberOfSeats
            }
        })
    }
}

export default TravelService