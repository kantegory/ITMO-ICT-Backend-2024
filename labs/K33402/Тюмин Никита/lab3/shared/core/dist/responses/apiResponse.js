"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    static payload(response, payload, status = 200) {
        response.status(status).json(payload);
    }
    static success(response, message = 'Success.', status = 200) {
        response.status(status).json({ detail: message });
    }
    static error(response, message = 'An error has occured.', status = 400) {
        response.status(status).json({ detail: message });
    }
    static errors(response, errors, status = 400) {
        response.status(status).json(errors);
    }
    static notFound(response, message = 'Not found.') {
        response.status(404).json({ detail: message });
    }
}
exports.default = ApiResponse;
