import sequelize from "../../database/database"
import { Place, PlaceCreate } from "../../models/place/Place"
import { Repository } from "sequelize-typescript"
import { CrudPlaceInterface } from "./IPlaceService"
import {RatingAdd} from "../../models/rating/Rating"


class PlaceService implements CrudPlaceInterface<number> {
    private placeRepository: Repository<Place> = sequelize.getRepository(Place)
    
    async findById(id: number): Promise<Place | null> {
        return this.placeRepository.findOne({
            where: {
                id: id
            }
        })
    }
    
    async addRating(id: number, data: RatingAdd) {
        await this.placeRepository.update(data, {
            where: {
                id: id
            }
        })
    }
}

export default PlaceService