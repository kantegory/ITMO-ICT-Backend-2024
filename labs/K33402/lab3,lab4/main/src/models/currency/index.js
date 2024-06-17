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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currancy = exports.CategoryName = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
var CategoryName;
(function (CategoryName) {
    CategoryName["TOKEN"] = "TOKEN";
    CategoryName["STABLECOIN"] = "STABLECOIN";
})(CategoryName || (exports.CategoryName = CategoryName = {}));
;
let Currancy = class Currancy extends sequelize_typescript_1.Model {
};
exports.Currancy = Currancy;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Currancy.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Currancy.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Currancy.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(CategoryName)),
        defaultValue: CategoryName.TOKEN,
    }),
    __metadata("design:type", String)
], Currancy.prototype, "category", void 0);
exports.Currancy = Currancy = __decorate([
    sequelize_typescript_1.Table
], Currancy);
exports.default = Currancy;
