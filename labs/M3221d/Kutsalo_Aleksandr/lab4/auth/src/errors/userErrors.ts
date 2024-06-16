
export class UserNotFound extends Error {
    constructor(message) {
        super(message)
        this.name = "UserNotFoundError"
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
    }
}

export class NotUniqueError extends Error {
    constructor(message) {
        super(message)
        this.name = "NotUniqueError"
    }
}
