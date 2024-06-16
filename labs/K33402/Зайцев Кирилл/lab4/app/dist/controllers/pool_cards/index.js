import { CardsService } from '../../services/pool_cards/index.js';
export class CardsController {
    constructor() {
        this.get = async (req, res) => {
            try {
                const identifier = req.body.identifier;
                const card = await this.service.get(identifier);
                res.send(card);
            }
            catch {
                res.status(404).send({ error: 'card with the specified identifier was not found' });
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
        this.decreaseAmount = async (req, res) => {
            try {
                const { identifier } = req.body;
                await this.service.decreaseAmount(identifier);
                res.send({ message: 'Remaining number of visits decreased successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Internal server error' });
            }
        };
        this.service = new CardsService();
    }
}
//# sourceMappingURL=index.js.map