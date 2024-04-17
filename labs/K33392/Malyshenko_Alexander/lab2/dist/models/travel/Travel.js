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
exports.Travel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("../user/User"));
const City_1 = __importDefault(require("../city/City"));
const TravelUserLink_1 = __importDefault(require("../links/TravelUserLink"));
const Transport_1 = __importDefault(require("../transport/Transport"));
let Travel = class Travel extends sequelize_typescript_1.Model {
};
exports.Travel = Travel;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Transport_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Travel.prototype, "transport_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Travel.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => City_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "departure_city", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => City_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "destination_city", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Travel.prototype, "departure_date", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Travel.prototype, "expected_arrival_date", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Travel.prototype, "actual_arrival_date", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "state", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Travel.prototype, "seats", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User_1.default, () => TravelUserLink_1.default),
    __metadata("design:type", Array)
], Travel.prototype, "travels", void 0);
exports.Travel = Travel = __decorate([
    sequelize_typescript_1.Table
], Travel);
exports.default = Travel;
