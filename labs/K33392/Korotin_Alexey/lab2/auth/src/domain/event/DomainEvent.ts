import {Entity} from "../meta";

export interface DomainEvent<E extends Entity<any>> {
    publishDateTime: Date;

    entity: E;
}

type EventCallback<E extends Entity<any>> = (event: DomainEvent<E>) => Promise<void>;

export class DomainEvents {
    private static handlers: { [key: string]: EventCallback<any>[] } = {};

    public static register<E extends Entity<any>>(callback: EventCallback<E>, eventType: string): void {
        if (!Object.prototype.hasOwnProperty.call(this.handlers, eventType)) {
            this.handlers[eventType] = [];
        }

        this.handlers[eventType].push(callback);
    }

    public static dispatchEvent<E extends Entity<any>>(event: DomainEvent<E>): void {
        const eventType: string = event.constructor.name;

        if (!Object.prototype.hasOwnProperty.call(this.handlers, eventType)) { // no handlers
            return;
        }

        this.handlers[eventType].forEach((func) => func(event));
    }
}
