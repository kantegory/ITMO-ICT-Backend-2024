import Repository from 'sequelize-typescript';
import { Hackathon } from '../model/task'
import sequelize from '../config/db';
import { Grading } from '../model/solution';
import { Curator, Jury } from '../model/user';


export class JuryRepository {
    private repository = sequelize.getRepository(Jury);

    async post(jury: Jury): Promise<Jury | null> {
        const new_jury = await this.repository.create(JSON.parse(JSON.stringify(jury)));
        return new_jury;
    }

    async delete(id: number) {
        this.repository.destroy({
            where: {
                id: id,
            },
        });
    }
}