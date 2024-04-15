import {DomainEvent} from "../Events";
import {Entity} from "../meta";


export interface EventSubscription<E extends DomainEvent<any>>{
    eventType: string;
    discriminator: string;

    reactOnEvent(event: E): Promise<void>;
}