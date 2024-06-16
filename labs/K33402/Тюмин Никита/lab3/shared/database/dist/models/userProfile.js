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
const tourActivity_1 = __importDefault(require("./dictionaries/tourActivity"));
const tourType_1 = __importDefault(require("./dictionaries/tourType"));
const comfortLevel_1 = __importDefault(require("./dictionaries/comfortLevel"));
const difficultyLevel_1 = __importDefault(require("./dictionaries/difficultyLevel"));
const place_1 = __importDefault(require("./dictionaries/place"));
const user_1 = __importDefault(require("./user"));
let UserProfile = class UserProfile extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserProfile.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserProfile.prototype, "maxBudget", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], UserProfile.prototype, "hasChildren", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserProfile.prototype, "peopleCount", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.default),
    __metadata("design:type", user_1.default)
], UserProfile.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => comfortLevel_1.default, {
        through: 'user_profile_has_comfort_level',
        foreignKey: 'userProfileId',
        otherKey: 'comfortLevelId',
    }),
    __metadata("design:type", Array)
], UserProfile.prototype, "comfortLevels", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => difficultyLevel_1.default, {
        through: 'user_profile_has_difficulty_level',
        foreignKey: 'userProfileId',
        otherKey: 'difficultyLevelId',
    }),
    __metadata("design:type", Array)
], UserProfile.prototype, "difficultyLevels", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => place_1.default, {
        through: 'user_profile_has_place',
        foreignKey: 'userProfileId',
        otherKey: 'placeId',
    }),
    __metadata("design:type", Array)
], UserProfile.prototype, "places", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tourActivity_1.default, {
        through: 'user_profile_has_tour_activity',
        foreignKey: 'userProfileId',
        otherKey: 'tourActivityId',
    }),
    __metadata("design:type", Array)
], UserProfile.prototype, "tourActivities", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tourType_1.default, {
        through: 'user_profile_has_tour_type',
        foreignKey: 'userProfileId',
        otherKey: 'tourTypeId',
    }),
    __metadata("design:type", Array)
], UserProfile.prototype, "tourTypes", void 0);
UserProfile = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user_profiles'
    })
], UserProfile);
exports.default = UserProfile;
