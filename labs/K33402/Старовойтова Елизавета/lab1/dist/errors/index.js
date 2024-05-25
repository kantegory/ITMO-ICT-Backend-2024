"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = exports.ValidationError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends Error {
    constructor(errors) {
        super();
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
class UnauthenticatedError extends Error {
    constructor() {
        super();
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
