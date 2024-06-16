import { Hackathon } from '../model/task';
import { HackathonRepository } from '../repository/hackathon';

export class AdminService {    
    private hackathonRepository: HackathonRepository;

    constructor() {
        this.hackathonRepository = new HackathonRepository();
    }

    async post_hackathon(hackathon: Hackathon): Promise<Hackathon | null> {
        const new_hackathon = await this.hackathonRepository.post(hackathon);
        return new_hackathon;
    }
}