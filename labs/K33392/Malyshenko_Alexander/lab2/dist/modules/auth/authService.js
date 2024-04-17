"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const userService_1 = __importDefault(require("../../services/user/userService"));
const PasswordHandler_1 = __importDefault(require("../../utils/PasswordHandler"));
let AuthService = class AuthService {
    constructor(userService, jwtService, pasHandler = new PasswordHandler_1.default()) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.pasHandler = pasHandler;
    }
    validateUser(username, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            // find if user exist with this email
            const user = yield this.userService.findByEmail(username);
            if (!user) {
                return null;
            }
            // find if user password match
            const match = yield this.pasHandler.comparePassword(pass, user.password);
            if (!match) {
                return null;
            }
            // tslint:disable-next-line: no-string-literal
            const _a = user['dataValues'], { password } = _a, result = __rest(_a, ["password"]);
            return result;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.generateToken(user);
            return { user, token };
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // hash the password
            //const pass = await this.pasHandler.hashPassword(user.password)
            // create the user
            const newUser = yield this.userService.create(Object.assign(Object.assign({}, user), { password: user.password }));
            // tslint:disable-next-line: no-string-literal
            const _a = newUser['dataValues'], { password } = _a, result = __rest(_a, ["password"]);
            // generate token
            const token = yield this.generateToken(newUser);
            // return the user and the token
            return { user: result, token };
        });
    }
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jwtService.signAsync(user);
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [userService_1.default,
        jwt_1.JwtService, Object])
], AuthService);
