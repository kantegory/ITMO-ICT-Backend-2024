import { Hackathon } from '../model/task';
import { Curator, Jury, User } from '../model/user'
import { CuratorRepository } from '../repository/curator';
import { HackathonRepository } from '../repository/hackathon';
import { JuryRepository } from '../repository/jury';
import { UserRepository } from '../repository/user';

export class AdminService {    
    private userRepository: UserRepository;
    private curatorRepository: CuratorRepository;
    private juryRepository: JuryRepository;
    private hackathonRepository: HackathonRepository;



    constructor() {
        this.curatorRepository = new CuratorRepository();
        this.juryRepository = new JuryRepository();
        this.userRepository = new UserRepository();
        this.hackathonRepository = new HackathonRepository();
    }

    
    async post_hackathon(hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.hackathonRepository.post(hackathon.toJSON());
        return new_hackathon;
    }

    async post_user(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    async post_curator(curator: Curator): Promise<Curator | null> {
        return this.curatorRepository.post(curator);
    }

    async delete_curator(id: number) {
        this.curatorRepository.delete(id);
    }


    async post_jury(jury: Jury): Promise<Jury | null> {
        return this.juryRepository.post(jury);
    }

    async delete_jury(id: number) {
        this.juryRepository.delete(id);
    }
}