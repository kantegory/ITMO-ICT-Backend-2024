"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUsersMiddlware = void 0;
const process_1 = __importDefault(require("process"));
const authUsersMiddlware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const resp = yield fetch(`${process_1.default.env.AUTH_SERVICE}/token/verify`, {
            method: "POST",
            body: JSON.stringify({ token: token }),
            headers: { "Content-Type": "application/json" },
        });
        if (!resp.ok) {
            res.sendStatus(401);
            return;
        }
        next();
    }
    catch (e) {
        res.sendStatus(401);
    }
});
exports.authUsersMiddlware = authUsersMiddlware;
