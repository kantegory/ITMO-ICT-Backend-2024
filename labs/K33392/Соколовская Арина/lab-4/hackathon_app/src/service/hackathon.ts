import { Solution } from "../model/solution";
import { Hackathon } from "../model/task";
import { Participant, Team } from "../model/team";
import { HackathonRepository } from "../repository/hackathon";
import { ParticipantRepository } from "../repository/participant";
import { SolutionRepository } from "../repository/solution";
import { TeamRepository } from "../repository/team";
import rabbitMQService from "../rabbitMQ/rabbitMQService";

export class HackathonService {
    private hackathonRepository: HackathonRepository;
    private solutionRepository: SolutionRepository;
    private teamRepository: TeamRepository;
    private participantRepository: ParticipantRepository;


    constructor() {
        this.hackathonRepository = new HackathonRepository();
        this.solutionRepository = new SolutionRepository();
        this.teamRepository = new TeamRepository();
        this.participantRepository = new ParticipantRepository();
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
        const participant = await this.participantRepository.findByParams(team.leader_id, team.task_id);
        if (participant) return null;

        const new_team = await this.teamRepository.post(team);
        if (new_team){
            await this.participantRepository.post(new_team.leader_id, new_team.id);
            await rabbitMQService.sendMessage('participation_queue', {'user_id': new_team.leader_id});
        }
        return new_team;
    }

    async patch(id: number, hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.hackathonRepository.patch(id, hackathon);
        return new_hackathon;
    }
}