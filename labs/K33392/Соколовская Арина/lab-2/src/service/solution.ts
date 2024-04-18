import { Solution } from "../model/solution";
import { SolutionRepository } from "../repository/solution";

export class SolutionService {
    private solutionRepository: SolutionRepository;

    constructor() {
        this.solutionRepository = new SolutionRepository();
    }

    async findById(id: number): Promise<Solution | null> {
        const solution = await this.solutionRepository.findById(id);
        return solution;
    }

    async patch(solution: Solution): Promise<Solution | null> {
        const new_solution = await this.solutionRepository.patch(solution.id, solution);
        return new_solution;
    }

}