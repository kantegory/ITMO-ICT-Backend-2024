import { User } from '../model/user'
import { UserRepository } from '../repository/user';

export class AuthService {
    private userRepository: UserRepository;


    constructor() {
        this.userRepository = new UserRepository();
    }

    async post_user(user: User): Promise<User> {
        const new_user = this.userRepository.create(user);
        console.log(new_user);
        return new_user;
    }
}