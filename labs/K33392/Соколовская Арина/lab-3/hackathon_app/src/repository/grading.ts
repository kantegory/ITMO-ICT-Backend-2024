import sequelize from '../config/db';
import { Grading } from '../model/solution';


export class GradingRepository {
    private repository = sequelize.getRepository(Grading);

    async post(grading: Grading): Promise<Grading | null> {
        const new_grading = await this.repository.create({user_id: grading.user_id, solution_id: grading.solution_id, points: grading.points, comment: grading.comment});
        return new_grading;
    }

    async get_gradings(hackathon_id: number): Promise<Grading[]> {
        const gradings = await this.repository.findAll();
        return gradings;
    }
}