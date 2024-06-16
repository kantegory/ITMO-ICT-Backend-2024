import {Entity} from "./meta";

export interface DomainEvent<E extends Entity<any>> {
    type: string;
    publishTime: Date;
    entity: E;
}