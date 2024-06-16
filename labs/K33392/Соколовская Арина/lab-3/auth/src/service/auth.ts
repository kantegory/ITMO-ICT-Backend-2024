import { User } from '../model/user'
import { UserRepository } from '../repository/user';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async post_user(user: User): Promise<User | null> {
        if (!user.role_name) {
            user.role_name = 'user';
        }
        const new_user = await this.userRepository.create(user);
        console.log(new_user);
        return new_user;
    }
}