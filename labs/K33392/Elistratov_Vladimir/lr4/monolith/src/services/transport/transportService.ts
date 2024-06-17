import sequelize from "../../database/database";
import { Transport, TransportCreate } from "../../models/transport/Transport";
import { Repository } from "sequelize-typescript";
import { CrudTransportInterface } from "./ITransportService";
import { NumberDataTypeOptions } from "sequelize";


class TransportService implements CrudTransportInterface<number> {
    private transportRepository: Repository<Transport> = sequelize.getRepository(Transport);
    create(data: TransportCreate): Promise<Transport> {
        try {
            return this.transportRepository.create(data);
        } catch (e: any) {
            return Promise.reject(e);
        }
    }

    deleteById(id: number): Promise<number> {
        return this.transportRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async findById(id: number): Promise<Transport | null> {
        return this.transportRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findAll(): Promise<Array<Transport> | null> {
        return this.transportRepository.findAll()
    }

    async findAllByUserId(user_id: number): Promise<Array<Transport> | null> {
        return this.transportRepository.findAll({
            where: {
                user_id: user_id
            }
        })
    }

    async updateById(id: number, data: TransportCreate): Promise<Transport> {
        const result = await this.transportRepository.update(data, {
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

export default TransportService;