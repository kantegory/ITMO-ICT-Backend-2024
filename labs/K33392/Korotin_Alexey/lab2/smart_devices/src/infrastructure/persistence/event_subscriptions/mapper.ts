import {Mapper} from "../mapper";
import {EventSubscription} from "../../../domain/subscriptions";
import {EventSubscriptionModel} from "./index";
import {LoggingTeapotSubscription} from "../../../domain/devices/teapot/Subscription";
import {TeapotEventType} from "../../../domain/devices/teapot";


export class EventSubscriptionMapper implements Mapper<EventSubscription<any>, EventSubscriptionModel> {

    public toEntity(model: EventSubscriptionModel): EventSubscription<any> {
        const discriminator = model.discriminatorValue;
        switch (discriminator) {
            case 'LOGGING_TEAPOT_SUBSCRIPTION':
                return new LoggingTeapotSubscription(model.id, model.eventType as TeapotEventType);
            default:
                // @ts-ignore todo delegate this logic to domain factory
                return undefined;
        }
    }

    public toModel(entity: EventSubscription<any>): EventSubscriptionModel {
        return new EventSubscriptionModel({
            id: entity.id,
            discriminatorValue: entity.discriminator,
            eventType: entity.eventType
        });
    }

}