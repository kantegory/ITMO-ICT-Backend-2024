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

    async findAllExcluding(attributes: string[]): Promise<Hackathon[] | []> {
        const hackathons = await this.repository.findAll({
            attributes: {
                exclude: attributes,
            }
        });
        return hackathons;
    }

    async findByIdExcluding(id: number, attributes: string[]): Promise<Hackathon | null> {
        const hackathon = await this.repository.findByPk(id, {
            attributes: {
                exclude: attributes,
            }
        });
        return hackathon;
    }

    async post(hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.repository.create({name: hackathon.name, description: hackathon.description, task: hackathon.task, start_datetime: hackathon.start_datetime, end_datetime: hackathon.end_datetime});
        return new_hackathon;
    }

    async patch(id: number, hackathon: Hackathon): Promise<Hackathon | null> {
        console.log(id);
        let db_hackathon = await this.repository.findByPk(id);
        if (!db_hackathon) {
            return null;
        }

        for (const key of Object.keys(hackathon) as (keyof Hackathon)[]) {
            if (hackathon[key] !== undefined) {
                (db_hackathon[key] as any) = hackathon[key];
            }
        }

        await db_hackathon.save();
        return db_hackathon;
    }


}