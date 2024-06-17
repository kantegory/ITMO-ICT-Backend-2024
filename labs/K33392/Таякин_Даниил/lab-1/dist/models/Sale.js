var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, Unique, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, } from 'sequelize-typescript';
import { Product } from './Product.js';
let Sale = class Sale extends Model {
};
__decorate([
    Unique,
    PrimaryKey,
    AutoIncrement,
    Column,
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], Sale.prototype, "name", void 0);
__decorate([
    Column,
    __metadata("design:type", Number)
], Sale.prototype, "percent", void 0);
__decorate([
    Column,
    __metadata("design:type", Date)
], Sale.prototype, "startsAt", void 0);
__decorate([
    Column,
    __metadata("design:type", Date)
], Sale.prototype, "endsAt", void 0);
__decorate([
    ForeignKey(() => Product),
    Column,
    __metadata("design:type", Number)
], Sale.prototype, "productID", void 0);
__decorate([
    BelongsTo(() => Product),
    __metadata("design:type", Product)
], Sale.prototype, "product", void 0);
Sale = __decorate([
    Table({
        timestamps: true,
        paranoid: true,
    })
], Sale);
export { Sale };
//# sourceMappingURL=Sale.js.map