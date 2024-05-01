import { CatsService } from '../../services/cats/index.js';
export class CatsController {
    constructor() {
        this.get = async (req, res) => {
            try {
                res.send(this.service.get(req.body.identifier));
            }
            catch {
                res
                    .status(404)
                    .send({ error: 'cat with the specified identifier was not found' });
            }
        };
        this.post = async (req, res) => {
            try {
                res.send(this.service.create(req.body));
            }
            catch {
                res.status(400).send({ error: 'invalid data specified' });
            }
        };
        this.service = new CatsService();
    }
}
//# sourceMappingURL=index.js.map