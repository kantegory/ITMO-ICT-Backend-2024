import { HackathonJury } from '../model/task'
import sequelize from '../config/db';


export class HackathonJuryRepository {
    private repository = sequelize.getRepository(HackathonJury);

    async findByPks(task_id: number, jury_id: number): Promise<HackathonJury | null> {
        const hackathonJury = await this.repository.findOne({
            where: {
                hackathon_id: task_id,
                jury_id: jury_id,
            },
        })
        return hackathonJury;
    }

    async post(hackathonJury: HackathonJury): Promise<HackathonJury | null> {
        const new_hackathonJury = this.repository.create({hackathon_id: hackathonJury.hackathon_id, jury_id: hackathonJury.jury_id});
        return new_hackathonJury;
    }
}