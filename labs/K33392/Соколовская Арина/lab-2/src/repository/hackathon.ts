import Repository from 'sequelize-typescript';
import { Hackathon } from '../model/task'
import sequelize from '../config/db';


export class HackathonRepository {
    private repository = sequelize.getRepository(Hackathon);

    async findByPks(ids: number[]): Promise<Hackathon[] | null> {
        const hackathons = await this.repository.findAll({
            where: {
                id: ids,
            },
        })
        return hackathons;
    }
}