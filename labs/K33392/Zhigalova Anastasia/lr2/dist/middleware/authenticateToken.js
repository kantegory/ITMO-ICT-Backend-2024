"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = __importDefault(require("process"));
dotenv_1.default.config();
const secretKey = process_1.default.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === undefined)
        return res.sendStatus(401);
    if (!authHeader.startsWith('Bearer'))
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process_1.default.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(403).send("Access Denied: Invalid Token");
        }
        req.user = user;
        next();
    });
};
exports.default = authenticateToken;
