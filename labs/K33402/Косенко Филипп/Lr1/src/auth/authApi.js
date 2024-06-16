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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { email, password } = user;
        const ifUserExist = yield models_1.default.findOne({ where: { email: email }
        });
        if (!ifUserExist) {
            res.status(400).json({
                status: 404,
                success: false,
                message: 'Not Found'
            });
            return;
        }
        ;
        const isPasswordMatched = (ifUserExist === null || ifUserExist === void 0 ? void 0 : ifUserExist.password) === password;
        // ** if not matched send response that wrong password;
        if (!isPasswordMatched) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "wrong password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: ifUserExist === null || ifUserExist === void 0 ? void 0 : ifUserExist.id, email: ifUserExist === null || ifUserExist === void 0 ? void 0 : ifUserExist.email }, "YOUR_SECRET", {
            expiresIn: "1d",
        });
        res.status(200).json({
            status: 202,
            success: true,
            message: 'token success',
            token: token
        });
    }
    catch (error) {
        res.status(400).json({
            status: 404,
            message: error.message.toString()
        });
    }
    ;
});
exports.default = AuthApi;
