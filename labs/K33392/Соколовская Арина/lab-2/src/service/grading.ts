import { Grading } from '../model/solution';
import { User } from '../model/user'
import { GradingRepository } from '../repository/grading';
import { UserRepository } from '../repository/user';

export class GradingService {
    private gradingRepository: GradingRepository;


    constructor() {
        this.gradingRepository = new GradingRepository();
    }

    async post(grading: Grading): Promise<Grading | null> {
        return this.gradingRepository.post(grading);
    }

    async get_gradings(hackathon_id: number): Promise<Grading[]> {
        return this.gradingRepository.get_gradings(hackathon_id);
    }
}