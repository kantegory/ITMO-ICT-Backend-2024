import { UserRepository } from "../../services/users/User.js";
export class UserController {
    constructor() {
        this.get = async (req, res) => {
            try {
                const user = await this.service.get();
                res.send(user);
            }
            catch (error) {
                console.error(error.message);
                res.status(404).send({ error: error.message });
            }
        };
        this.post = async (req, res) => {
            try {
                const user = await this.service.create(req.body);
                res.json(user);
            }
            catch {
                res.status(400).send({ error: 'Указанные неверные данные' });
            }
        };
        this.service = new UserRepository();
    }
}
//# sourceMappingURL=User.js.map