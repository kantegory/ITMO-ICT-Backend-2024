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
// import User from "../../models/users";
const users_1 = __importDefault(require("../../service/users"));
// import { Error } from "sequelize";
class UserController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userservis.getAll();
                res.status(200).send(users);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
        this.getId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const result = yield this.userservis.getById(id);
                if (result === null) {
                    res.status(404).send(`Not found user`);
                    return;
                }
                ;
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userservis.create(req.body);
                res.status(200).send(user);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.updatePas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userservis.updatePassword(+req.params.id, req.body);
                if (user === null) {
                    res.status(404).send(`Not found user`);
                    return;
                }
                ;
                res.status(200).send(user);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.updateEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userservis.updateEmail(+req.params.id, req.body);
                if (user === null) {
                    res.status(404).send(`Not found user`);
                    return;
                }
                ;
                res.status(200).send(user);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.userservis = new users_1.default();
    }
    ;
}
exports.default = UserController;
