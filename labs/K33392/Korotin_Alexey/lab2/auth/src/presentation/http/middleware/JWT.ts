import { Request, Response, NextFunction } from "express";
import {checkExpirationStatus, DecodeResult, decodeSession, ExpirationStatus} from "../../../application/services/JWT";
import {Session} from "node:inspector";


/**
 * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.
 */
export function jwtAuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const unauthorized = (message: string) => response.status(401).json({
        message: message
    });

    const requestHeader = "Authorization";
    let header = request.header(requestHeader);

    if (!header) {
        unauthorized(`Required ${requestHeader} header not found.`);
        return;
    }

    const bearerRegex = new RegExp("^Bearer\\s.*$");

    if (!bearerRegex.test(header)) {
        unauthorized('Expected Bearer type token');
        return;
    }

    header = header.replace("Bearer ", '');

    const decodedSession: DecodeResult = decodeSession(header);

    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
        return;
    }

    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

    if (expiration === "expired") {
        unauthorized(`Authorization token has expired. Please create a new authorization token.`);
        return;
    }
    // Set the session on response.locals object for routes to access
    response.locals = {
        ...response.locals,
        session: Session
    };

    // Request has a valid session. Call next to continue to the authenticated route handler
    next();
}