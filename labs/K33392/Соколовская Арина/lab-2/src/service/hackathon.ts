import { Solution } from "../model/solution";
import { Hackathon } from "../model/task";
import { Team } from "../model/team";
import { HackathonRepository } from "../repository/hackathon";
import { SolutionRepository } from "../repository/solution";
import { TeamRepository } from "../repository/team";

export class HackathonService {
    private hackathonRepository: HackathonRepository;
    private solutionRepository: SolutionRepository;
    private teamRepository: TeamRepository;

    constructor() {
        this.hackathonRepository = new HackathonRepository();
        this.solutionRepository = new SolutionRepository();
        this.teamRepository = new TeamRepository();
    }

    async findAll(): Promise<Hackathon[] | []> {
        const hackathons = await this.hackathonRepository.findAllExcluding(['about', 'task']);
        return hackathons;
    }

    async findById(id: number): Promise<Hackathon | null> {
        const hackathon = await this.hackathonRepository.findByIdExcluding(id, ['task']);
        return hackathon;
    }
    
    async findTaskById(id: number): Promise<Hackathon | null> {
        const hackathon = await this.hackathonRepository.findByIdExcluding(id, ['about']);
        return hackathon;
    }

    async post(hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.hackathonRepository.post(hackathon);
        return new_hackathon;
    }

    async postSolution(solution: Solution): Promise<Solution | null> {
        const new_solution = await this.solutionRepository.post(solution);
        return new_solution;
    }

    async postTeam(team: Team): Promise<Team | null> {
        const new_team = await this.teamRepository.post(team);
        return new_team;
    }

    async patch(hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.hackathonRepository.patch(hackathon.id, hackathon);
        return new_hackathon;
    }
}