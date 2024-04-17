"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
        try {
            const bearerToken = headerToken.slice(7);
            console.log(`${bearerToken}`);
            const res = jsonwebtoken_1.default.verify(bearerToken, process.env.JWTKEY || "error");
            next();
        }
        catch (e) {
            res.status(401).send({ "error": e });
        }
    }
    else {
        res.status(401).json({ "mag": "Access token denied" });
    }
};
exports.default = validateJWT;
