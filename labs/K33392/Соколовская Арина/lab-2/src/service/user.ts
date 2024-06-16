import { Hackathon } from '../model/task';
import { User } from '../model/user'
import { HackathonRepository } from '../repository/hackathon';
import { ParticipantRepository } from '../repository/participant';
import { TeamRepository } from '../repository/team';
import { UserRepository } from '../repository/user';

export class UserService {
    private participantRepository: ParticipantRepository;
    private teamRepository: TeamRepository;
    private hackathonRepository: HackathonRepository;
    private userRepository: UserRepository;


    constructor() {
        this.participantRepository = new ParticipantRepository();
        this.teamRepository = new TeamRepository();
        this.hackathonRepository = new HackathonRepository();
        this.userRepository = new UserRepository();
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

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }

    async patch(user: User): Promise<User> {
        const updeted_user = await this.userRepository.patch(user.id, user);
        return updeted_user;
    }
}