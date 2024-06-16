import {EventSubscription} from "../../subscriptions";
import {Teapot, TeapotEventType} from "./index";
import {DomainEvent} from "../../Events";
import {Entity} from "../../meta";


export class LoggingTeapotSubscription implements EventSubscription<DomainEvent<Teapot>> {
    discriminator: string = 'LOGGING_TEAPOT_SUBSCRIPTION';
    eventType: string;

    constructor(public id: string, eventType: TeapotEventType) {
        this.eventType = eventType;
    }

    public async reactOnEvent(event: DomainEvent<Teapot>): Promise<void> {
        const entity = event.entity;
        console.log(`Teapot ${entity.id} dispatched event '${event.type}' at ${event.publishTime}. 
        Hello from ${this.discriminator}`);
    }

    public equals(other: LoggingTeapotSubscription): boolean {
        return this.id === other.id;
    }
}