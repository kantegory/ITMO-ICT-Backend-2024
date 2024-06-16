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
const userMapper_1 = __importDefault(require("../../mapper/user/userMapper"));
const PasswordHandler_1 = __importDefault(require("../../utils/PasswordHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor(userService) {
        this.userMapper = new userMapper_1.default();
        this.passwordHandler = new PasswordHandler_1.default();
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByEmail(request.body["email"]);
            if (!user) {
                return response.status(404).send();
            }
            const isPasswordCorrect = this.passwordHandler.comparePassword(user.password, request.body["password"]);
            if (!isPasswordCorrect) {
                return response.status(401).send();
            }
            const secretKey = process.env.JWTKEY;
            console.log(`SECRET KEY: ${secretKey}`);
            if (!secretKey) {
                return response.status(401).send();
            }
            const token = jsonwebtoken_1.default.sign({
                email: user.email
            }, secretKey);
            return response.status(200).json({ "token": token, "user": this.userMapper.userToDict(user) });
        });
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const user = yield this.userService.findById(id);
            if (!user) {
                return response.status(404).send();
            }
            const dto = this.userMapper.userToDict(user);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdUser = yield this.userService.create(body);
                const dto = this.userMapper.userToDict(createdUser);
                return response.status(201).send(dto);
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.patchUpdateById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            const id = Number(request.params.id);
            try {
                const updatedUser = yield this.userService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const userList = yield this.userService.findAll();
            if (!userList) {
                return response.status(404).send();
            }
            let data = [];
            userList.forEach(user => {
                data.push(this.userMapper.userToDict(user));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.userService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.userService = userService;
    }
}
exports.default = UserController;
