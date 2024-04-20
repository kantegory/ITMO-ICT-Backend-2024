import { Participant } from '../model/team';
import sequelize from '../config/db';

export class ParticipantRepository {
    private repository = sequelize.getRepository(Participant);

    async findbyUserId(id: number): Promise<Participant[] | null> {
        const participants = await this.repository.findAll({
            where: {
                user_id: id,
            },
        })
        return participants;
    }

    async post(participant: Participant): Promise<Participant | null> {
        const new_participant = await this.repository.create(JSON.parse(JSON.stringify(participant)));

        return new_participant;
    }

    async findByParams(user_id: number, hackathon_id: number): Promise<Participant | null> {
        const participant = await this.repository.findOne({
            where: {
                user_id: user_id,
                task_id: hackathon_id,
            }
        })
        return participant;
    }
}