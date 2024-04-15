import Repository from 'sequelize-typescript';
import { Team } from '../model/team'
import sequelize from '../config/db';


export class TeamRepository {
    private repository = sequelize.getRepository(Team);

    async findByPks(ids: number[]): Promise<Team[] | null> {
        const teams = await this.repository.findAll({
            where: {
                id: ids,
            },
        })
        return teams;
    }
}