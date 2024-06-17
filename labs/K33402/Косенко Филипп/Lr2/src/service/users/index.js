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
// import { Request, Response, response } from "express";
const users_1 = __importDefault(require("../../models/users"));
// import { Error } from "sequelize";
class UserServis {
    // get = async ()=>{
    //     return res.send("hello World");
    // };
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield users_1.default.findAll().then(err => console.log(err));
                return result != undefined ? result : 'Sorry yuor DB is empty';
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield users_1.default.findByPk(id);
                return result != undefined ? result : 'Sorry yuor DB is empty';
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    ;
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield users_1.default.create(userData);
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    ;
    updatePassword(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Users = yield users_1.default.update({ password: userData.password }, { where: { id: id } });
                return Users;
            }
            catch (err) {
                console.log(err);
            }
            ;
        });
    }
    ;
    updateEmail(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Users = yield users_1.default.update({ email: userData.email }, { where: { id: id } });
                return Users;
            }
            catch (err) {
                console.log(err);
            }
            ;
        });
    }
    ;
}
exports.default = UserServis;
