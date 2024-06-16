import {Entity} from "./meta";
import {v4} from "uuid";

export abstract class Factory<E extends Entity<any>, CR, R> {
    public abstract create(attributes: CR): E;
    public abstract restore(attributes: R): E;

    protected generateId(): string {
        return v4();
    }
}