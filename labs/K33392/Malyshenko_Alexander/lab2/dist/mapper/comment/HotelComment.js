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
exports.HotelComment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Hotel_1 = __importDefault(require("../hotel/Hotel"));
let HotelComment = class HotelComment extends sequelize_typescript_1.Model {
};
exports.HotelComment = HotelComment;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Hotel_1.default),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], HotelComment.prototype, "hotel_id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], HotelComment.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], HotelComment.prototype, "main_info", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], HotelComment.prototype, "rating", void 0);
exports.HotelComment = HotelComment = __decorate([
    sequelize_typescript_1.Table
], HotelComment);
exports.default = HotelComment;
