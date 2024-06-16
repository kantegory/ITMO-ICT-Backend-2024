import { Request, Response } from 'express'
import { Subscription } from '../../models/subscription/index.js'
import {SubscriptionsService} from '../../services/subscription/index.js'

export class SubscriptionController {
    service: SubscriptionsService

    constructor() {
        this.service = new SubscriptionsService()
    }

    get = async (req: Request, res: Response) => {
        try {
            const identifier = (req.body as Subscription).identifier;
            const card = await this.service.get(identifier);
            res.send(card);
        } catch {
            res.status(404).send({ error: 'card with the specified identifier was not found' });
        }
    }
    post = async (req: Request, res: Response) => {
        try {
            res.send(this.service.create(req.body as Subscription))
        } catch {
            res.status(400).send({ error: 'invalid data specified' })
        }
    }

    decreaseAmount = async (req: Request, res: Response) => {
        try {
            const { identifier } = req.body as { identifier: number };
            await this.service.decreaseAmount(identifier);
            res.send({ message: 'Remaining number of visits decreased successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        }
    }
}