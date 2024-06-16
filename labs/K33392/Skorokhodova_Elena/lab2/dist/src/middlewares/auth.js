"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUsersMiddlware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = __importDefault(require("process"));
const authUsersMiddlware = (req, res, next) => {
    try {
        if ((req.path === "/users" && req.method === "POST") ||
            req.path === "/login" ||
            req.path === "/register")
            return next();
        if (!req.headers.authorization)
            return res.status(403).json({ message: "Unauthorized" });
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(403).json({ message: "Unauthorized" });
        jsonwebtoken_1.default.verify(token, process_1.default.env.JWT_SECRET_KEY);
        next();
    }
    catch (e) {
        res.sendStatus(401);
    }
};
exports.authUsersMiddlware = authUsersMiddlware;
