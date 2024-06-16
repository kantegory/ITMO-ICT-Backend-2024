import {Entity} from "../meta";

export default interface Factory<E extends Entity<any>, C, R> {
    create(createAttributes: C): E;
    restore(restoreAttributes: R): E;
}