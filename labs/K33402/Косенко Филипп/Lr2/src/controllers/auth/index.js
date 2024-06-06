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
const console_1 = require("console");
const auth_1 = __importDefault(require("../../service/auth"));
class AuthControll {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authcontroll.register(req.body);
                res.status(200).send(result);
            }
            catch (_a) {
                res.status(400).send(console_1.error);
            }
        });
        this.auth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authcontroll.auth(req.body.email, req.body.password);
                res.status(200).send(result);
            }
            catch (_b) {
                res.status(400).send(console_1.error);
            }
        });
        this.authcontroll = new auth_1.default();
    }
}
exports.default = AuthControll;
