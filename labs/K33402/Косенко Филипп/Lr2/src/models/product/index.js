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
exports.Product = exports.CategoryName = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
var CategoryName;
(function (CategoryName) {
    CategoryName["SHIRT"] = "SHIRT";
    CategoryName["SHORTS"] = "SHORTS";
    CategoryName["SWEATER"] = "SWEATER";
    CategoryName["TROUSERS"] = "TROUSERS";
})(CategoryName || (exports.CategoryName = CategoryName = {}));
;
let Product = class Product extends sequelize_typescript_1.Model {
};
exports.Product = Product;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "sail", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(CategoryName)),
        defaultValue: CategoryName.SHIRT,
    }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "des", void 0);
exports.Product = Product = __decorate([
    sequelize_typescript_1.Table
], Product);
exports.default = Product;
