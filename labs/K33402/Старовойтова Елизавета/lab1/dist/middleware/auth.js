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
exports.checkRefreshToken = exports.checkAccessToken = void 0;
const errors_1 = require("../errors");
const jwt_1 = __importDefault(require("../utils/jwt"));
const user_1 = __importDefault(require("../models/user"));
const checkAccessToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request.user = yield checkToken(request.cookies.jwt_access);
    }
    catch (e) {
        next(e);
    }
    next();
});
exports.checkAccessToken = checkAccessToken;
const checkRefreshToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request.user = yield checkToken(request.cookies.jwt_refresh);
    }
    catch (e) {
        next(e);
    }
    next();
});
exports.checkRefreshToken = checkRefreshToken;
const checkToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new errors_1.UnauthenticatedError();
    }
    let data;
    try {
        data = jwt_1.default.verify(token);
    }
    catch (e) {
        throw new errors_1.UnauthenticatedError();
    }
    // @ts-ignore
    const user = yield user_1.default.findOne({ where: { email: data.sub } });
    if (!user) {
        throw new errors_1.UnauthenticatedError();
    }
    return user;
});
