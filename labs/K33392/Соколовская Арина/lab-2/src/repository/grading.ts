import sequelize from '../config/db';
import { Grading } from '../model/solution';


export class GradingRepository {
    private repository = sequelize.getRepository(Grading);

    async post(grading: Grading): Promise<Grading | null> {
        const new_grading = await this.repository.create(grading.toJSON());
        return new_grading;
    }

    async get_gradings(hackathon_id: number): Promise<Grading[]> {
        const gradings = await this.repository.findAll();
        return gradings;
    }
}