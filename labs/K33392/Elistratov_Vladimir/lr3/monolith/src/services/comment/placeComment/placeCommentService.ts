import sequelize from "../../../database/database";
import { PlaceComment, PlaceCommentCreate } from "../../../models/comment/PlaceComment";
import { Repository } from "sequelize-typescript";
import { CrudPlaceCommentInterface } from "./IPlaceCommentService";


class PlaceCommentService implements CrudPlaceCommentInterface<number> {
    private placeCommentRepository: Repository<PlaceComment> = sequelize.getRepository(PlaceComment);
    create(data: PlaceCommentCreate): Promise<PlaceComment> {
        try {
            return this.placeCommentRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.placeCommentRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<PlaceComment | null> {
        return this.placeCommentRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findByPlaceId(place_id: number): Promise<Array<PlaceComment> | null> {
        return this.placeCommentRepository.findAll({
            where: {
                id: place_id
            }
        });
    }

    async findAll(): Promise<Array<PlaceComment> | null> {
        return this.placeCommentRepository.findAll()
    }

    async updateById(id: number, data: PlaceCommentCreate): Promise<PlaceComment> {
        const result = await this.placeCommentRepository.update(data, {
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

export default PlaceCommentService;