import { DogsService } from '../../services/dogs/Dog.js';
export class DogsController {
    constructor() {
        this.get = async (req, res) => {
            try {
                const dog = await this.service.get(Number(req.params.id));
                res.send(dog);
            }
            catch {
                res.status(404).send({ error: 'Dog with the specified id was not found' });
            }
        };
        this.post = async (req, res) => {
            try {
                const dog = await this.service.create(req.body);
                res.status(201).send(dog);
            }
            catch {
                res.status(400).send({ error: 'Invalid data specified' });
            }
        };
        this.service = new DogsService();
    }
}
//# sourceMappingURL=Dog.js.map