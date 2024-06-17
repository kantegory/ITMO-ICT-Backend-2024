import sequelize from "../../../database/database";
import { TravelUserLink, TravelUserLinkCreate } from "../../../models/links/TravelUserLink";
import { Repository } from "sequelize-typescript";
import { CrudTravelUserLinkInterface } from "./ITravelUserLinkService";


class TravelUserLinkService implements CrudTravelUserLinkInterface<number, number>{
    private travelUserLinkRepository: Repository<TravelUserLink> = sequelize.getRepository(TravelUserLink);
    create(data: TravelUserLinkCreate): Promise<TravelUserLink> {
        try {
            return this.travelUserLinkRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.travelUserLinkRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<TravelUserLink | null> {
        return this.travelUserLinkRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findByUserId(user_id: number): Promise<TravelUserLink | null> {
        return this.travelUserLinkRepository.findOne({
            where: {
                id: user_id
            }
        });
    }

    async findByTravelId(travel_id: number): Promise<TravelUserLink | null> {
        return this.travelUserLinkRepository.findOne({
            where: {
                id: travel_id
            }
        });
    }

    async findAll(): Promise<Array<TravelUserLink> | null> {
        return this.travelUserLinkRepository.findAll()
    }

    async updateById(id: number, data: TravelUserLinkCreate): Promise<TravelUserLink> {
        const result = await this.travelUserLinkRepository.update(data, {
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

export default TravelUserLinkService;