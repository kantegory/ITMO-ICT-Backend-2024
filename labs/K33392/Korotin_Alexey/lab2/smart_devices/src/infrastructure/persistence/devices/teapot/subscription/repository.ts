import {EventSubscription} from "../../../../../domain/subscriptions";
import {EventSubscriptionMapper} from "../../../event_subscriptions/mapper";
import {Teapot} from "../../../../../domain/devices/teapot";
import {EventSubscriptionModel} from "../../../event_subscriptions";
import {Repository} from "sequelize-typescript";
import sequelize from "../../../db";
import {TeapotSubscriptionModel} from "./TeapotSubscription";
import {v4} from "uuid";


export class TeapotSubscriptionRepository {
    private readonly subMapper: EventSubscriptionMapper = new EventSubscriptionMapper();
    private readonly teapotSubscriptionRepo: Repository<TeapotSubscriptionModel> =
        sequelize.getRepository(TeapotSubscriptionModel);

    public async save(teapotId: string, subscription: EventSubscription<any>): Promise<EventSubscription<any>> {
        let subModel = await this.subMapper.toModel(subscription).save();
        subModel = await subModel.save();
        const teapotSub = await this.teapotSubscriptionRepo.create({
            id: v4(),
            teapotId: teapotId,
            subscriptionId: subModel.id
        }, {include: {all: true}}).then(m => m.reload());

        return Promise.resolve(this.subMapper.toEntity(teapotSub.subscription));
    }
}