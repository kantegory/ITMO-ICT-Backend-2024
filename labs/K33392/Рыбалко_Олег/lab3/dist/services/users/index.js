import { BaseService } from '../../services/base/index.js';
export class UsersService extends BaseService {
    constructor() {
        super(...arguments);
        this.findByEmail = async (email) => {
            return await this.model.findOne({ where: { email: email } });
        };
    }
}
//# sourceMappingURL=index.js.map