import sequelize from "../../database/database"
import { Place, PlaceCreate } from "../../models/place/Place"
import { Repository } from "sequelize-typescript"
import { CrudPlaceInterface } from "./IPlaceService"
import {RatingAdd} from "../../models/rating/Rating"


class PlaceService implements CrudPlaceInterface<number> {
    private placeRepository: Repository<Place> = sequelize.getRepository(Place)
    create(data: PlaceCreate): Promise<Place> {
        try {
            return this.placeRepository.create(data)
        } catch (e: any) {
            return Promise.reject(e)
        }
    }

    deleteById(id: number): Promise<number> {
        return this.placeRepository.destroy({
            where: {
                id: id
            }
        })
    }

    async findById(id: number): Promise<Place | null> {
        return this.placeRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async findAll(): Promise<Array<Place> | null> {
        return this.placeRepository.findAll()
    }

    async findAllByCityId(user_id: number, sorted: boolean = true, limit: number = 5): Promise<Array<Place> | null> {
            return this.placeRepository.findAll({
                where: {
                    city_id: user_id
                },
                order: [
                  [sequelize.literal('(rating/amount_of_rates)'), sorted ? 'DESC':'ASC']
                ],
                limit: limit
            })
    }

    async updateById(id: number, data: PlaceCreate): Promise<Place> {
        const result = await this.placeRepository.update(data, {
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

    async addRating(id: number, data: RatingAdd) {
        console.log("!!!!!!!!ooooook", id, data)
        await this.placeRepository.update(data, {
            where: {
                id: id
            }
        })
    }
}

export default PlaceService