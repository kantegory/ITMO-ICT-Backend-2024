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
const database_1 = __importDefault(require("../../../database/database"));
const UserComment_1 = require("../../../models/comment/UserComment");
class UserCommentService {
    constructor() {
        this.userCommentRepository = database_1.default.getRepository(UserComment_1.UserComment);
    }
    create(data) {
        try {
            return this.userCommentRepository.create(data);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    deleteById(id) {
        return this.userCommentRepository.destroy({
            where: {
                id: id
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userCommentRepository.findOne({
                where: {
                    id: id
                }
            });
        });
    }
    findByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userCommentRepository.findOne({
                where: {
                    id: user_id
                }
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userCommentRepository.findAll();
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userCommentRepository.update(data, {
                where: {
                    id: id
                },
                returning: true
            });
            if (result[0] === 0) {
                return Promise.reject({ message: "Not found" });
            }
            return Promise.resolve(result[1][0]);
        });
    }
}
exports.default = UserCommentService;
