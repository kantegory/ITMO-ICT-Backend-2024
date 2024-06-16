export interface Equatable<T> {
    equals(other: T): boolean;
}

export interface Entity<ID> extends Equatable<Entity<ID>> {
    id: ID
}