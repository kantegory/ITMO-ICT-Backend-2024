import {DomainEvent} from "../Events";
import {Entity} from "../meta";


export interface EventSubscription<E extends DomainEvent<any>> extends Entity<string> {
    eventType: string;
    discriminator: string;

    reactOnEvent(event: E): Promise<void>;
}