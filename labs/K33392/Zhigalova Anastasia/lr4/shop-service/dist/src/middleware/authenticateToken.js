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
const dotenv_1 = __importDefault(require("dotenv"));
const node_fetch_1 = __importDefault(require("node-fetch"));
dotenv_1.default.config();
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    if (authHeader === undefined)
        return res.sendStatus(401);
    if (!authHeader.startsWith("Bearer"))
        return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    try {
        const resp = yield (0, node_fetch_1.default)("${process.env.AUTH_SERVICE_URL}/users/verify", {
            body: JSON.stringify({ token: token }),
            headers: { "content-type": "application/json" },
            method: "POST",
        });
        if (!resp.ok)
            return res.sendStatus(401);
        next();
    }
    catch (error) {
        console.error("Error during token verification:", error);
        return res.sendStatus(500);
    }
});
exports.default = authenticateToken;
