"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourType = exports.TourActivity = exports.Place = exports.DifficultyLevel = exports.ComfortLevel = exports.Tour = exports.UserProfile = exports.User = exports.models = exports.initSeq = void 0;
const shared_database_1 = require("shared-database");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return shared_database_1.User; } });
Object.defineProperty(exports, "UserProfile", { enumerable: true, get: function () { return shared_database_1.UserProfile; } });
Object.defineProperty(exports, "Tour", { enumerable: true, get: function () { return shared_database_1.Tour; } });
Object.defineProperty(exports, "ComfortLevel", { enumerable: true, get: function () { return shared_database_1.ComfortLevel; } });
Object.defineProperty(exports, "DifficultyLevel", { enumerable: true, get: function () { return shared_database_1.DifficultyLevel; } });
Object.defineProperty(exports, "Place", { enumerable: true, get: function () { return shared_database_1.Place; } });
Object.defineProperty(exports, "TourActivity", { enumerable: true, get: function () { return shared_database_1.TourActivity; } });
Object.defineProperty(exports, "TourType", { enumerable: true, get: function () { return shared_database_1.TourType; } });
const models = [
    shared_database_1.User,
    shared_database_1.UserProfile,
    shared_database_1.Tour,
    shared_database_1.ComfortLevel,
    shared_database_1.DifficultyLevel,
    shared_database_1.Place,
    shared_database_1.TourActivity,
    shared_database_1.TourType,
];
exports.models = models;
const initSeq = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbModels = yield (0, shared_database_1.initDb)({
        database: process.env.DB_DATABASE,
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        storage: process.env.DB_STORAGE,
    }, models);
});
exports.initSeq = initSeq;
