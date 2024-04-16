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

    async findByIdExcluding(id: number, attributes: string[]): Promise<Hackathon | null> {
        const hackathon = await this.repository.findByPk(id, {
            attributes: {
                exclude: attributes,
            }
        });
        return hackathon;
    }

    async post(hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.repository.create(hackathon.toJSON());
        return new_hackathon;
    }

    async patch(id: number, hackathon: Hackathon): Promise<Hackathon | null> {
        let db_hackathon = await this.repository.findByPk(id);
        db_hackathon = hackathon;
        db_hackathon.save();
        
        return db_hackathon;
    }


}