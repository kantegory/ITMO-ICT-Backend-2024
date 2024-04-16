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

    async post(team: Team): Promise<Team | null> {
        const new_team = this.repository.create(team.toJSON());
        return new_team;
    }

    async patch(id: number, team: Team): Promise<Team | null> {
        let db_team = await this.repository.findByPk(id);
        db_team = team;
        db_team.save();
        return db_team;
    }
}