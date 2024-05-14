import { User } from '../model/user'
import { UserRepository } from '../repository/user';

export class UserService {
    private userRepository: UserRepository;


    constructor() {
        this.userRepository = new UserRepository();
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