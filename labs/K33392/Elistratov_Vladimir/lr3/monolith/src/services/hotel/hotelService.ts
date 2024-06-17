import sequelize from "../../database/database";
import { Hotel, HotelCreate } from "../../models/hotel/Hotel";
import { Repository } from "sequelize-typescript";
import { CrudHotelInterface } from "./IHotelService";


class HotelService implements CrudHotelInterface<number> {
    private hotelRepository: Repository<Hotel> = sequelize.getRepository(Hotel);
    create(data: HotelCreate): Promise<Hotel> {
        try {
            return this.hotelRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.hotelRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<Hotel | null> {
        return this.hotelRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findAllByCityId(user_id: number): Promise<Array<Hotel> | null> {
        return this.hotelRepository.findAll({
            where: {
                city_id: user_id
            }
        })
    }

    async findAll(): Promise<Array<Hotel> | null> {
        return this.hotelRepository.findAll()
    }

    async updateById(id: number, data: HotelCreate): Promise<Hotel> {
        const result = await this.hotelRepository.update(data, {
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

export default HotelService;