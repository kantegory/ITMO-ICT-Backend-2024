import { User } from '../model/user'
import { UserRepository } from '../repository/user';

export class AuthService {
    private userRepository: UserRepository;


    constructor() {
        this.userRepository = new UserRepository();
    }

    async post_user(user: User): Promise<User> {
        return this.userRepository.create(user);
    }
}