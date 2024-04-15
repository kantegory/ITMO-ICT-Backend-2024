import Repository from 'sequelize-typescript';
import { Participant } from '../model/team'
import sequelize from '../config/db';
import { Hackathon } from '../model/task';


export class ParticipantRepository {
    private repository = sequelize.getRepository(Participant);

    async findbyUserId(id: number): Promise<Participant[] | null>{
        const participants = await this.repository.findAll({
            where: {
                user_id: id,
            },
        })
        return participants;
    }
}