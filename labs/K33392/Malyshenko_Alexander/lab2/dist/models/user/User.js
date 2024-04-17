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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const PasswordHandler_1 = __importDefault(require("../../utils/PasswordHandler"));
const Travel_1 = __importDefault(require("../travel/Travel"));
const TravelUserLink_1 = __importDefault(require("../links/TravelUserLink"));
const Country_1 = __importDefault(require("../country/Country"));
const validator_1 = require("validator");
let User = class User extends sequelize_typescript_1.Model {
    static hashPassword(instance) {
        const handler = new PasswordHandler_1.default();
        const { password } = instance;
        if (instance.changed("password")) {
            instance.password = (0, validator_1.toString)(handler.hashPassword(password));
        }
    }
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Country_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "homeland_id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "rating", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "amount_of_rates", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Travel_1.default, () => TravelUserLink_1.default),
    __metadata("design:type", Array)
], User.prototype, "travels", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], User, "hashPassword", null);
exports.User = User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.default = User;
