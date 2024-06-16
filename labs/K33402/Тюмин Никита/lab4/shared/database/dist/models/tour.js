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
const sequelize_typescript_1 = require("sequelize-typescript");
const base_1 = __importDefault(require("./base"));
const place_1 = __importDefault(require("./dictionaries/place"));
const difficultyLevel_1 = __importDefault(require("./dictionaries/difficultyLevel"));
const comfortLevel_1 = __importDefault(require("./dictionaries/comfortLevel"));
const tourActivity_1 = __importDefault(require("./dictionaries/tourActivity"));
const tourType_1 = __importDefault(require("./dictionaries/tourType"));
let Tour = class Tour extends base_1.default {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Tour.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tour.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Tour.prototype, "canGoWithChildren", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tour.prototype, "maxPeople", void 0);
__decorate([
    sequelize_typescript_1.Column,
    (0, sequelize_typescript_1.ForeignKey)(() => comfortLevel_1.default),
    __metadata("design:type", Number)
], Tour.prototype, "comfortLevelId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    (0, sequelize_typescript_1.ForeignKey)(() => difficultyLevel_1.default),
    __metadata("design:type", Number)
], Tour.prototype, "difficultyLevelId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    (0, sequelize_typescript_1.ForeignKey)(() => place_1.default),
    __metadata("design:type", Number)
], Tour.prototype, "placeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tourActivity_1.default, {
        through: 'tour_has_tour_activity',
        foreignKey: 'tourId',
        otherKey: 'tourActivityId',
    }),
    __metadata("design:type", Array)
], Tour.prototype, "tourActivities", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tourType_1.default, {
        through: 'tour_has_tour_type',
        foreignKey: 'tourId',
        otherKey: 'tourTypeId',
    }),
    __metadata("design:type", Array)
], Tour.prototype, "tourTypes", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => comfortLevel_1.default),
    __metadata("design:type", comfortLevel_1.default)
], Tour.prototype, "comfortLevel", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => difficultyLevel_1.default),
    __metadata("design:type", difficultyLevel_1.default)
], Tour.prototype, "difficultyLevel", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => place_1.default),
    __metadata("design:type", place_1.default)
], Tour.prototype, "place", void 0);
Tour = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'tours'
    })
], Tour);
exports.default = Tour;
