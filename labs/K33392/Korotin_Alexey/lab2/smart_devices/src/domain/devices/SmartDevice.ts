import {Entity} from "../meta";
import {Profile} from "../profile";
import {DomainEvent} from "../Events";
import {EventSubscription} from "../subscriptions";


export abstract class SmartDevice implements Entity<string> {
    protected constructor(public id: string, protected name: string,
                          protected linkedProfile: Profile) {
    }

    protected abstract dispatchEvent<E extends DomainEvent<any>>(event: E): void;

    public abstract subscribe<E extends EventSubscription<any>>(subscription: E): void;

    public abstract equals(other: Entity<string>): boolean;
}