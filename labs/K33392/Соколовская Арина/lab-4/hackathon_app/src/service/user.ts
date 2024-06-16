import { Hackathon } from '../model/task';
import { HackathonRepository } from '../repository/hackathon';
import { ParticipantRepository } from '../repository/participant';
import { TeamRepository } from '../repository/team';

export class UserService {
    private participantRepository: ParticipantRepository;
    private teamRepository: TeamRepository;
    private hackathonRepository: HackathonRepository;


    constructor() {
        this.participantRepository = new ParticipantRepository();
        this.teamRepository = new TeamRepository();
        this.hackathonRepository = new HackathonRepository();
    }

    async findUserHackathons(id: number): Promise<Hackathon[]> {
        const participations = await this.participantRepository.findbyUserId(id);
        if (participations == null) return [];
        const teams = await this.teamRepository.findByPks(participations.map(({team_id}) => (team_id)));
        if (teams == null) return [];
        const hackathons = await this.hackathonRepository.findByPks(teams.map(({task_id}) => (task_id)));
        if (hackathons == null) return [];
        return hackathons;
        return [];
    }
}