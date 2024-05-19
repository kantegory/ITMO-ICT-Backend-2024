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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponse_1 = __importDefault(require("../responses/apiResponse"));
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    constructor() {
        this.findAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const users = yield userService_1.default.findAll();
            apiResponse_1.default.payload(response, users);
        });
        this.findById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userService_1.default.findById(Number(request.params.id));
            apiResponse_1.default.payload(response, user);
        });
        this.deleteById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield userService_1.default.deleteById(Number(request.params.id));
                apiResponse_1.default.success(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = UserController;
