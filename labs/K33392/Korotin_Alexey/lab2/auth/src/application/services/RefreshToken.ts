import {decode, encode, TAlgorithm} from "jwt-simple";

export interface RefreshToken {
    typ: "Refresh",
    sub: string,
    iss: string,
    iat: number,
    exp: number
}


export type RefreshDecodeResult = {
    type: RefreshDecodeStatus;
    token?: RefreshToken;
}


export type RefreshDecodeStatus = "INVALID" | "EXPIRED" | "INVALID_SIGNATURE" | "VALID";


const SECRET = process.env["app.secret"] ?? "";
const TOKEN_DURATION_DAYS = Number(process.env["app.token.refresh.durationDays"]) ?? 30;
const TOKEN_ISSUER_CLAIM = process.env['app.token.issuer'] ?? "Unknown";

export function encodeRefresh(userId: string): string {

    const issued = Date.now();
    const tokenDurationMinutes = TOKEN_DURATION_DAYS * 24 * 60 * 60 * 1000;
    const expires = issued + tokenDurationMinutes;

    const token: RefreshToken = {
        typ: "Refresh",
        sub: userId,
        iss: TOKEN_ISSUER_CLAIM,
        iat: Math.floor(issued / 1000),
        exp: Math.floor(expires / 1000)
    }

    return encode(token, SECRET, "HS512");
}

export function decodeRefresh(token: string): RefreshDecodeResult {
    // Always use HS512 to decode the token
    const algorithm: TAlgorithm = "HS512";

    let result: RefreshToken;

    try {
        result = decode(token, SECRET, false, algorithm);
    } catch (_e: any) {
        const e: Error = _e;

        // These error strings can be found here:
        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "INVALID"
            };
        }

        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "INVALID_SIGNATURE"
            };
        }

        // Handle json parse errors, thrown when the payload is nonsense
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "INVALID"
            };
        }
        throw e;
    }
    return {
        type: "VALID",
        token: result
    }
}