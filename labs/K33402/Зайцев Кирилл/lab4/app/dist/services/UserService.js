import { User } from '../models/user.js';
export class UserService {
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }
    async createUser(data) {
        return await User.create(data);
    }
}
//# sourceMappingURL=UserService.js.map