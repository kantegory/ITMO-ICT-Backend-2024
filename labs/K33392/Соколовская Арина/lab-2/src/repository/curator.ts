import Repository from 'sequelize-typescript';
import { Hackathon } from '../model/task'
import sequelize from '../config/db';
import { Grading } from '../model/solution';
import { Curator } from '../model/user';


export class CuratorRepository {
    private repository = sequelize.getRepository(Curator);

    async post(curator: Curator): Promise<Curator | null> {
        const new_curator = await this.repository.create(curator.toJSON());
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