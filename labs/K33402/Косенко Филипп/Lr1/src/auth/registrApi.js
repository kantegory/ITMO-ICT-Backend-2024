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
const RegisterPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;
        console.log(user);
        // ** destructure the information from user;
        const { name, email, password } = user;
        const isEmailAllReadyExist = yield models_1.default.findOne({
            where: { email: email }
        });
        // ** Add a condition if the user exist we will send the response as email all ready exist
        if (isEmailAllReadyExist) {
            res.status(400).json({
                status: 400,
                message: "Email all ready in use",
            });
            return;
        }
        // now create the user;
        const newUser = yield models_1.default.create({
            name: name,
            email: email,
            password: password
        });
        // Send the newUser as  response;
        res.status(200).json({
            status: 201,
            success: true,
            message: " User created Successfully",
            user: newUser,
        });
    }
    catch (error) {
        // console the error to debug
        console.log(error);
        // Send the error message to the client
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});
exports.default = RegisterPost;
