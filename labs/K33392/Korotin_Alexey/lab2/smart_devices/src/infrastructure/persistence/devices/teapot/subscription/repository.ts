import {EventSubscription} from "../../../../../domain/subscriptions";
import {EventSubscriptionMapper} from "../../../event_subscriptions/mapper";
import {Teapot} from "../../../../../domain/devices/teapot";
import {EventSubscriptionModel} from "../../../event_subscriptions";
import {Repository} from "sequelize-typescript";
import sequelize from "../../../db";
import {TeapotSubscriptionModel} from "./TeapotSubscription";


export class TeapotSubscriptionRepository {
    private readonly subMapper: EventSubscriptionMapper = new EventSubscriptionMapper();
    private readonly teapotSubscriptionRepo: Repository<TeapotSubscriptionModel> =
        sequelize.getRepository(TeapotSubscriptionModel);

    public async save(teapot: Teapot, subscription: EventSubscription<any>): Promise<EventSubscription<any>> {
        const subModel = await this.subMapper.toModel(subscription).save();
        const teapotSub = await this.teapotSubscriptionRepo.create({
            teapotId: teapot.id,
            subscriptionId: subModel.id
        });

        return Promise.resolve(this.subMapper.toEntity(teapotSub.subscription));
    }
}