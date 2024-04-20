import { Solution } from "../model/solution";
import { Hackathon } from "../model/task";
import { Participant, Team } from "../model/team";
import { CuratorRepository } from "../repository/curator";
import { HackathonRepository } from "../repository/hackathon";
import { HackathonJuryRepository } from "../repository/hackathonJury";
import { ParticipantRepository } from "../repository/participant";
import { SolutionRepository } from "../repository/solution";
import { TeamRepository } from "../repository/team";

export class HackathonService {
    private hackathonRepository: HackathonRepository;
    private solutionRepository: SolutionRepository;
    private teamRepository: TeamRepository;
    private participantRepository: ParticipantRepository;
    private curatorRepository: CuratorRepository;
    private hackathonJuryRepository: HackathonJuryRepository;

    constructor() {
        this.hackathonRepository = new HackathonRepository();
        this.solutionRepository = new SolutionRepository();
        this.teamRepository = new TeamRepository();
        this.participantRepository = new ParticipantRepository();
        this.curatorRepository = new CuratorRepository();
        this.hackathonJuryRepository = new HackathonJuryRepository();
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
        const curator = await this.curatorRepository.findByParams(team.leader_id, team.task_id);
        if (curator) return null;
        const jury = await this.hackathonJuryRepository.findByPks(team.leader_id, team.task_id);
        if (jury) return null;

        const new_team = await this.teamRepository.post(team);
        if (new_team){
            const participant = JSON.parse(JSON.stringify({user_id: new_team.leader_id, task_id: new_team.task_id}));
            await this.participantRepository.post(participant as Participant);
        }
        return new_team;
    }

    async patch(hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.hackathonRepository.patch(hackathon.id, hackathon);
        return new_hackathon;
    }
}