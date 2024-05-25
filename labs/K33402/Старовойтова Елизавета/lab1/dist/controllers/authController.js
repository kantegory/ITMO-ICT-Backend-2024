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
const apiResponse_1 = __importDefault(require("../responses/apiResponse"));
const jwt_1 = __importDefault(require("../config/jwt"));
const authService_1 = __importDefault(require("../services/authService"));
class AuthController {
    constructor() {
        this.register = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield authService_1.default.register(request.body);
                apiResponse_1.default.payload(response, user);
            }
            catch (e) {
                next(e);
            }
        });
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield authService_1.default.login(request.body);
                response.cookie('jwt_access', tokens.accessToken, { maxAge: jwt_1.default.JWT_ACCESS_TOKEN_TTL * 1000, httpOnly: true });
                response.cookie('jwt_refresh', tokens.refreshToken, { maxAge: jwt_1.default.JWT_REFRESH_TOKEN_TTL * 1000, httpOnly: true });
                apiResponse_1.default.payload(response, tokens);
            }
            catch (e) {
                next(e);
            }
        });
        this.refresh = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield authService_1.default.refreshToken(request.user);
                response.cookie('jwt_access', tokens.accessToken, { maxAge: jwt_1.default.JWT_ACCESS_TOKEN_TTL * 1000, httpOnly: true });
                response.cookie('jwt_refresh', tokens.refreshToken, { maxAge: jwt_1.default.JWT_REFRESH_TOKEN_TTL * 1000, httpOnly: true });
                apiResponse_1.default.payload(response, tokens);
            }
            catch (e) {
                next(e);
            }
        });
        this.logout = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // await LogoutUseCase.run(request) todo revoke
                response.clearCookie('jwt_access');
                response.clearCookie('jwt_refresh');
                apiResponse_1.default.success(response, 'ok');
            }
            catch (e) {
                next(e);
            }
        });
        this.me = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                apiResponse_1.default.payload(response, request.user);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = AuthController;
