import {Entity} from "../meta";

export interface DomainEvent<E> {
    publishDateTime: Date;

    entity: E;
}

type EventCallback<E> = (event: DomainEvent<E>) => Promise<void>;

export class DomainEvents {
    private static handlers: { [key: string]: EventCallback<any>[] } = {};

    public static register<E>(callback: EventCallback<E>, eventType: string): void {
        if (!this.handlers.hasOwnProperty(eventType)) {
            this.handlers[eventType] = [];
        }

        this.handlers[eventType].push(callback);
    }

    public static dispatchEvent<E>(event: DomainEvent<E>): void {
        const eventType: string = event.constructor.name;

        if (!this.handlers.hasOwnProperty(eventType)) { // no handlers
            return;
        }

        this.handlers[eventType].forEach((func) => func(event));
    }
}
