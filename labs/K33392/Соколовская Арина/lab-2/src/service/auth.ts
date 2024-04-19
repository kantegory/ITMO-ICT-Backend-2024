import { User } from '../model/user'
import { UserRepository } from '../repository/user';
import { RoleService } from './role';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async post_user(user: User): Promise<User> {
        user.role_name = 'user';
        const new_user = this.userRepository.create(user);
        console.log(new_user);
        return new_user;
    }
}