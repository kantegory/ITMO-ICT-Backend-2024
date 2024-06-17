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
exports.Basket = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
// import User from "../users";
const product_1 = __importDefault(require("../product"));
let Basket = class Basket extends sequelize_typescript_1.Model {
};
exports.Basket = Basket;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Basket.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Basket.prototype, "userName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Basket.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_1.default),
    __metadata("design:type", product_1.default)
], Basket.prototype, "product", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Basket.prototype, "productName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Basket.prototype, "count", void 0);
exports.Basket = Basket = __decorate([
    sequelize_typescript_1.Table
], Basket);
;
exports.default = Basket;
