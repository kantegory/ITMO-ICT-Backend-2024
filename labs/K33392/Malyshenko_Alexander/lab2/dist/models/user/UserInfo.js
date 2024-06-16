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
exports.UserInfo = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("./User"));
let UserInfo = class UserInfo extends sequelize_typescript_1.Model {
};
exports.UserInfo = UserInfo;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserInfo.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserInfo.prototype, "main_info", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserInfo.prototype, "firstname", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserInfo.prototype, "lastname", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserInfo.prototype, "age", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserInfo.prototype, "phone_number", void 0);
exports.UserInfo = UserInfo = __decorate([
    sequelize_typescript_1.Table
], UserInfo);
exports.default = UserInfo;
