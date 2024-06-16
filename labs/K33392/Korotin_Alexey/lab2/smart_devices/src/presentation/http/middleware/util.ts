import {AccountRole, AccountStatus} from "../../../domain/replicas/Account";
import {decode, TAlgorithm} from "jwt-simple";
import {type} from "node:os";

export interface Session {
    sub: string;
    email: string;
    role: AccountRole;
    status: AccountStatus;
    iss: string;
    iat: number;
    exp: number;
}

export type DecodeResult =
    | {
    type: "valid";
    session: Session;
}
    | {
    type: "integrity-error";
}
    | {
    type: "invalid-token";
};

export type ExpirationStatus = "expired" | "active";

const SECRET = process.env["app.secret"] ?? "";

export function decodeSession(tokenString: string): DecodeResult {
    // Always use HS512 to decode the token
    const algorithm: TAlgorithm = "HS512";

    let result: Session;

    try {
        result = decode(tokenString, SECRET, false, algorithm);
    } catch (_e: any) {
        const e: Error = _e;

        // These error strings can be found here:
        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }

        if (e.message === "Token expired") {
            return {
                type: "invalid-token"
            }
        }

        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }

        // Handle json parse errors, thrown when the payload is nonsense
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }
        throw e;
    }
    return {
        type: "valid",
        session: result
    }
}

export function checkExpirationStatus(token: Session): ExpirationStatus {
    const now = Date.now() / 1000;

    if (token.exp > now) return "active";

    return "expired";
}