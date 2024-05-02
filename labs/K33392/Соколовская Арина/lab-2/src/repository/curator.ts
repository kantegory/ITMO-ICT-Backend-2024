import Repository from 'sequelize-typescript';
import { Hackathon } from '../model/task'
import sequelize from '../config/db';
import { Grading } from '../model/solution';
import { Curator } from '../model/user';


export class CuratorRepository {
    private repository = sequelize.getRepository(Curator);

    async findByParams(user_id: number, hackathon_id: number): Promise<Curator | null> {
        const curator = await this.repository.findOne({
            where: {
                user_id: user_id,
                task_id: hackathon_id,
            }
        });
        return curator;
    }

    async findByPk(id: number): Promise<Curator | null> {
        const curator = await this.repository.findByPk(id);
        return curator;
    }

    async post(curator: Curator): Promise<Curator | null> {
        const new_curator = await this.repository.create(JSON.parse(JSON.stringify(curator)));
        return new_curator;
    }

    async delete(id: number) {
        this.repository.destroy({
            where: {
                id: id,
            },
        });
    }
}