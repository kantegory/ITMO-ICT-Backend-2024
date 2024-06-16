"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.initDb = exports.TourType = exports.TourActivity = exports.Place = exports.DifficultyLevel = exports.ComfortLevel = exports.BaseDictionary = exports.Tour = exports.UserProfile = exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = __importStar(require("./models"));
Object.defineProperty(exports, "BaseDictionary", { enumerable: true, get: function () { return models_1.BaseDictionary; } });
Object.defineProperty(exports, "ComfortLevel", { enumerable: true, get: function () { return models_1.ComfortLevel; } });
Object.defineProperty(exports, "DifficultyLevel", { enumerable: true, get: function () { return models_1.DifficultyLevel; } });
Object.defineProperty(exports, "Place", { enumerable: true, get: function () { return models_1.Place; } });
Object.defineProperty(exports, "Tour", { enumerable: true, get: function () { return models_1.Tour; } });
Object.defineProperty(exports, "TourActivity", { enumerable: true, get: function () { return models_1.TourActivity; } });
Object.defineProperty(exports, "TourType", { enumerable: true, get: function () { return models_1.TourType; } });
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return models_1.User; } });
Object.defineProperty(exports, "UserProfile", { enumerable: true, get: function () { return models_1.UserProfile; } });
const initDb = (params_1, ...args_1) => __awaiter(void 0, [params_1, ...args_1], void 0, function* (params, customModels = null) {
    const sequelize = new sequelize_typescript_1.Sequelize({
        database: params.database,
        dialect: params.dialect,
        username: params.username,
        password: params.password,
        storage: params.storage,
        logging: console.log,
    });
    sequelize.addModels(customModels === null ? models_1.default : customModels);
    yield sequelize.authenticate();
    return {
        sequelize: sequelize,
        models: {
            User: models_1.User,
            UserProfile: models_1.UserProfile,
            Tour: models_1.Tour,
            ComfortLevel: models_1.ComfortLevel,
            DifficultyLevel: models_1.DifficultyLevel,
            Place: models_1.Place,
            TourActivity: models_1.TourActivity,
            TourType: models_1.TourType,
        },
    };
});
exports.initDb = initDb;
