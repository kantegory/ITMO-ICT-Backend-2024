import {
    SubscriptionCreationError, SubscriptionNotFound, SubscriptionUseError
} from '../../errors/subscription/index.js'
import {Subscription} from '../../models/subscription/index.js'
import {SubscriptionController} from "../../controllers/subscription/index.js";

export class SubscriptionsService {
    async create(SubscriptionData: any): Promise<Subscription> {
        try {
            return (await Subscription.create(SubscriptionData)).toJSON()
        } catch {
            throw new SubscriptionCreationError('failed to create a card')
        }
    }

    async get(identifier: number): Promise<Subscription> {
        try {
            return await Subscription.findByPk(identifier)
        } catch {
            throw new SubscriptionNotFound(
                `card with the identifier ${identifier} was not found}`
            )
        }
    }

    async decreaseAmount(identifier: number): Promise<void> {
        try {
            const Subscription = await this.get(identifier);
            if (Subscription.amount_left <= 0) {
                throw new SubscriptionUseError('Amount left is already zero or negative');
            }
            Subscription.amount_left -= 1;
            await Subscription.save();
        } catch (error) {
            throw new SubscriptionNotFound("card with the identifier ${identifier} was not found");
        }
    }
}
