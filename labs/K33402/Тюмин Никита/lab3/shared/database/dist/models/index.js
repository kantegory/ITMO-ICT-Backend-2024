"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourType = exports.TourActivity = exports.Place = exports.DifficultyLevel = exports.ComfortLevel = exports.BaseDictionary = exports.Tour = exports.UserProfile = exports.User = void 0;
const userProfile_1 = __importDefault(require("./userProfile"));
exports.UserProfile = userProfile_1.default;
const tour_1 = __importDefault(require("./tour"));
exports.Tour = tour_1.default;
const comfortLevel_1 = __importDefault(require("./dictionaries/comfortLevel"));
exports.ComfortLevel = comfortLevel_1.default;
const difficultyLevel_1 = __importDefault(require("./dictionaries/difficultyLevel"));
exports.DifficultyLevel = difficultyLevel_1.default;
const place_1 = __importDefault(require("./dictionaries/place"));
exports.Place = place_1.default;
const tourActivity_1 = __importDefault(require("./dictionaries/tourActivity"));
exports.TourActivity = tourActivity_1.default;
const tourType_1 = __importDefault(require("./dictionaries/tourType"));
exports.TourType = tourType_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const base_1 = __importDefault(require("./dictionaries/base"));
exports.BaseDictionary = base_1.default;
const models = [
    user_1.default,
    userProfile_1.default,
    tour_1.default,
    comfortLevel_1.default,
    difficultyLevel_1.default,
    place_1.default,
    tourActivity_1.default,
    tourType_1.default,
];
exports.default = models;
