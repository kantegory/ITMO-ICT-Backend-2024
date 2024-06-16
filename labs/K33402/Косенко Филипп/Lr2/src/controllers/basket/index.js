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
const basket_1 = __importDefault(require("../../service/basket"));
class BasketController {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.basketcontroller.getAll();
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.basketcontroller.getById(+req.params.id);
                res.status(200).send({ result });
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.basketcontroller.create(req.body.userId, req.body.count);
                console.log(req.body.userId);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.basketcontroller.updateProduct(req.body.id, req.body.data);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.basketcontroller = new basket_1.default();
    }
    ;
}
exports.default = BasketController;
