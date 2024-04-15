import {EventSubscription} from "../../subscriptions";
import {Teapot, TeapotEventType} from "./index";
import {DomainEvent} from "../../Events";


export class LoggingTeapotSubscription implements EventSubscription<DomainEvent<Teapot>> {
    discriminator: string = 'LOGGING_TEAPOT_SUBSCRIPTION';
    eventType: string;

    constructor(eventType: TeapotEventType) {
        this.eventType = eventType;
    }

    public async reactOnEvent(event: DomainEvent<Teapot>): Promise<void> {
        const entity = event.entity;
        console.log(`Teapot ${entity.id} dispatched event '${event.type}' at ${event.publishTime}. 
        Hello from ${this.discriminator}`);
    }
}