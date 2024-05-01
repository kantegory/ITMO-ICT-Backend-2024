import { BaseController } from '../base/index.js';
import { User } from '../../models/user.js';
import { UsersService } from '../../services/users/index.js';
export class AuthController extends BaseController {
    constructor() {
        super();
        this.post = async (req, res) => { };
        this.service = new UsersService(User);
    }
}
//# sourceMappingURL=index.js.map