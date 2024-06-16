var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.js';
import { Product } from './product.js';
let Sale = class Sale extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    Column,
    __metadata("design:type", Number)
], Sale.prototype, "id", void 0);
__decorate([
    ForeignKey(() => User),
    Column,
    __metadata("design:type", Number)
], Sale.prototype, "userId", void 0);
__decorate([
    ForeignKey(() => Product),
    Column,
    __metadata("design:type", Number)
], Sale.prototype, "productId", void 0);
__decorate([
    Column,
    __metadata("design:type", Number)
], Sale.prototype, "quantity", void 0);
__decorate([
    Column,
    __metadata("design:type", Number)
], Sale.prototype, "totalPrice", void 0);
__decorate([
    BelongsTo(() => User),
    __metadata("design:type", User)
], Sale.prototype, "user", void 0);
__decorate([
    BelongsTo(() => Product),
    __metadata("design:type", Product)
], Sale.prototype, "product", void 0);
Sale = __decorate([
    Table
], Sale);
export { Sale };
//# sourceMappingURL=sale.js.map