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

async post(user_id: number, team_id: number): Promise<Participant | null> {
        console.log("in rep")
        console.log(user_id + " " + team_id)
        const new_participant = await this.repository.create({user_id: user_id, team_id: team_id});
        console.log("out rep")

        return new_participant;
    }

    async findByParams(user_id: number, hackathon_id: number): Promise<Participant | null> {
        const participant = await this.repository.findOne({
            where: {
                user_id: user_id,
            }
        })
        return participant;
    }
}