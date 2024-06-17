import { BaseService } from '../base/Base.js';
export class UserService extends BaseService {
    constructor() {
        super(...arguments);
        this.findByEmail = async (email) => {
            return await this.model.findOne({ where: { email: email } });
        };
    }
}
//# sourceMappingURL=User.js.map