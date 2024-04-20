import { Hackathon, HackathonJury } from '../model/task';
import { Curator, Jury, User } from '../model/user'
import { CuratorRepository } from '../repository/curator';
import { HackathonRepository } from '../repository/hackathon';
import { HackathonJuryRepository } from '../repository/hackathonJury';
import { JuryRepository } from '../repository/jury';
import { UserRepository } from '../repository/user';

export class AdminService {    
    private userRepository: UserRepository;
    private curatorRepository: CuratorRepository;
    private juryRepository: JuryRepository;
    private hackathonRepository: HackathonRepository;
    private hackathonJuryRepository: HackathonJuryRepository;

    constructor() {
        this.curatorRepository = new CuratorRepository();
        this.juryRepository = new JuryRepository();
        this.userRepository = new UserRepository();
        this.hackathonRepository = new HackathonRepository();
        this.hackathonJuryRepository = new HackathonJuryRepository();
    }

    async post_hackathon(hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.hackathonRepository.post(hackathon);
        return new_hackathon;
    }

    async post_user(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

    async post_curator(curator: Curator): Promise<Curator | null> {
        return await this.curatorRepository.post(curator);
    }

    async delete_curator(id: number) {
        await this.curatorRepository.delete(id);
    }


    async post_jury(jury: Jury, hackathon_id: number): Promise<Jury | null> {
        const hackathonJury = JSON.parse(JSON.stringify({user_id: jury.user_id, task_id: hackathon_id}));
        await this.hackathonJuryRepository.post(hackathonJury as HackathonJury);
        return await this.juryRepository.post(jury);
        return null;
    }

    async delete_jury(id: number) {
        await this.juryRepository.delete(id);
    }
}