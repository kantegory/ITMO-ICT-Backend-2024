"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = exports.transform = exports.BaseTransformer = exports.ApiResponse = exports.errors = void 0;
const errors_1 = require("./errors");
const responses_1 = require("./responses");
Object.defineProperty(exports, "ApiResponse", { enumerable: true, get: function () { return responses_1.ApiResponse; } });
const baseTransformer_1 = __importDefault(require("./transformers/baseTransformer"));
exports.BaseTransformer = baseTransformer_1.default;
const transform_1 = __importDefault(require("./transformers/transform"));
exports.transform = transform_1.default;
const baseController_1 = __importDefault(require("./controllers/baseController"));
exports.BaseController = baseController_1.default;
const errors = {
    NotFoundError: errors_1.NotFoundError,
    UnauthenticatedError: errors_1.UnauthenticatedError,
    ValidationError: errors_1.ValidationError,
};
exports.errors = errors;
