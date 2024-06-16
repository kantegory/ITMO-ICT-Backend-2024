import express from 'express';


class ApiResponse {
    static payload(response: express.Response, payload: Array<any>|Object|null, status = 200) {
        response.status(status).json(payload)
    }

    static success(response: express.Response, message = 'Success.', status = 200) {
        response.status(status).json({detail: message})
    }

    static error(response: express.Response, message = 'An error has occured.', status = 400) {
        response.status(status).json({detail: message})
    }

    static errors(response: express.Response, errors: Array<any>, status = 400) {
        response.status(status).json(errors)
    }

    static notFound(response: express.Response, message = 'Not found.') {
        response.status(404).json({detail: message})
    }
}

export default ApiResponse