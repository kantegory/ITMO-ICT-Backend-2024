import sequelize from "../../../database/database";
import { HotelComment, HotelCommentCreate } from "../../../models/comment/HotelComment";
import { Repository } from "sequelize-typescript";
import { CrudHotelCommentInterface } from "./IHotelCommentService";


class HotelCommentService implements CrudHotelCommentInterface<number> {
    private hotelCommentRepository: Repository<HotelComment> = sequelize.getRepository(HotelComment);
    create(data: HotelCommentCreate): Promise<HotelComment> {
        try {
            return this.hotelCommentRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.hotelCommentRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<HotelComment | null> {
        return this.hotelCommentRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findByHotelId(hotel_id: number): Promise<HotelComment | null> {
        return this.hotelCommentRepository.findOne({
            where: {
                id: hotel_id
            }
        });
    }

    async findAll(): Promise<Array<HotelComment> | null> {
        return this.hotelCommentRepository.findAll()
    }

    async updateById(id: number, data: HotelCommentCreate): Promise<HotelComment> {
        const result = await this.hotelCommentRepository.update(data, {
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

export default HotelCommentService;