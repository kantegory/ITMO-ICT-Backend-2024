import { CardCreationError, CardNotFound, CardUseError } from '../../errors/pool_cards/index.js';
import { PoolCard } from '../../models/pool_cards/index.js';
export class CardsService {
    async create(cardData) {
        try {
            return (await PoolCard.create(cardData)).toJSON();
        }
        catch {
            throw new CardCreationError('failed to create a card');
        }
    }
    async get(identifier) {
        try {
            return await PoolCard.findByPk(identifier);
        }
        catch {
            throw new CardNotFound(`card with the identifier ${identifier} was not found}`);
        }
    }
    async decreaseAmount(identifier) {
        try {
            const card = await this.get(identifier);
            if (card.amount_left <= 0) {
                throw new CardUseError('Amount left is already zero or negative');
            }
            card.amount_left -= 1;
            await card.save();
        }
        catch (error) {
            throw new CardNotFound("card with the identifier ${identifier} was not found");
        }
    }
}
//# sourceMappingURL=index.js.map