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
const currency_1 = __importDefault(require("../../service/currency"));
class CurrancyController {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.currancycontroller.getAll();
                res.status(200).send(product);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
        this.getId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const result = yield this.currancycontroller.getById(id);
                if (result === null) {
                    res.status(404).send(`Not found product`);
                    return;
                }
                ;
                res.status(200).send(result);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                // const 
                const product = yield this.currancycontroller.createCurrancy(req.body);
                res.status(200).send(product);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
        this.getPrice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const result = yield this.currancycontroller.getById(id);
                if (result === null) {
                    res.status(404).send(`Not found product`);
                    return;
                }
                ;
                res.status(200).send(result.price);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const result = yield this.currancycontroller.updatePrice(id, req.body.price);
                res.status(200).send(`update \n ${result}`);
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
        this.currancycontroller = new currency_1.default();
    }
    ;
}
exports.default = CurrancyController;
;
