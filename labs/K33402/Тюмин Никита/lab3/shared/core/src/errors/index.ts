export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}
export class ValidationError extends Error {
    public errors: Array<Object>
    constructor(errors: Array<Object>) {
        super()
        this.errors = errors
    }
}
export class UnauthenticatedError extends Error {
    constructor() {
        super();
    }
}