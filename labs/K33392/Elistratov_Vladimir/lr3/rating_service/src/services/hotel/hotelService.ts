import sequelize from "../../database/database";
import { Hotel, HotelCreate } from "../../models/hotel/Hotel";
import { Repository } from "sequelize-typescript";
import { CrudHotelInterface } from "./IHotelService";
import { RatingAdd } from "../../models/rating/Rating";


class HotelService implements CrudHotelInterface<number> {
    private hotelRepository: Repository<Hotel> = sequelize.getRepository(Hotel);

    async findById(id: number): Promise<Hotel | null> {
        return this.hotelRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async addRating(id: number, data: RatingAdd) {
        await this.hotelRepository.update(data, {
            where: {
                id: id
            }
        })
    }

}

export default HotelService;