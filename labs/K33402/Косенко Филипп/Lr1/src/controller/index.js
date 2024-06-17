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
const models_1 = __importDefault(require("../models"));
const console_1 = require("console");
class BaseUrl {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.send("hello World");
        });
        this.finde = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const { id } = user;
                const result = models_1.default.findOne({ where: { id } }).then(err => console.log(err));
                const { name } = result;
                console.log(result.name);
                // const resiltParseToJSON = JSON.stringify(result.name)
                res.status(200).json({
                    responce: name
                });
            }
            catch (_a) {
                console.log(console_1.error);
            }
        });
    }
}
;
exports.default = BaseUrl;
