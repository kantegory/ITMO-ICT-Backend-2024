import Repository from 'sequelize-typescript';
import { Team } from '../model/team'
import sequelize from '../config/db';


export class TeamRepository {
    private repository = sequelize.getRepository(Team);

    async findByPk(id: number): Promise<Team | null> {
        const team = await this.repository.findByPk(id);
        return team;
    }

    async findByPks(ids: number[]): Promise<Team[] | null> {
        const teams = await this.repository.findAll({
            where: {
                id: ids,
            },
        })
        return teams;
    }

    async post(team: Team): Promise<Team | null> {
        const new_team = this.repository.create({leader_id: team.leader_id, name: team.name, description: team.description, task_id: team.task_id});
        return new_team;
    }

    async patch(id: number, team: Team): Promise<Team | null> {
        let db_team = await this.repository.findByPk(id);
        if (!db_team) {
            return null;
        }

        for (const key of Object.keys(team) as (keyof Team)[]) {
            if (team[key] !== undefined) {
                (db_team[key] as any) = team[key];
            }
        }

        await db_team.save();
        return db_team;
    }

    async findByLead(hackathon_id: number, lead_id: number): Promise<Team | null> {
        const team = this.repository.findOne({
            where: {
                leader_id: lead_id,
                task_id: hackathon_id,
            }
        })
        return team;
    }
}