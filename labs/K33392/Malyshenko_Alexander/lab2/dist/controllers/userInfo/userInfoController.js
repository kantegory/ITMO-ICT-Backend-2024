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
const userInfoMapper_1 = __importDefault(require("../../mapper/userInfo/userInfoMapper"));
class UserInfoController {
    constructor(userInfoService) {
        this.userInfoMapper = new userInfoMapper_1.default();
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const userInfo = yield this.userInfoService.findById(id);
            if (!userInfo) {
                return response.status(404).send();
            }
            const dto = this.userInfoMapper.userInfoToDict(userInfo);
            return response.status(200).json(dto);
        });
        this.getFindByUserId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user_id = Number(request.params.user_id);
            const userInfo = yield this.userInfoService.findByUserId(user_id);
            if (!userInfo) {
                return response.status(404).send();
            }
            const dto = this.userInfoMapper.userInfoToDict(userInfo);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdUserInfo = yield this.userInfoService.create(body);
                const dto = this.userInfoMapper.userInfoToDict(createdUserInfo);
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
                const updatedUserInfo = yield this.userInfoService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const userInfoList = yield this.userInfoService.findAll();
            if (!userInfoList) {
                return response.status(404).send();
            }
            let data = [];
            userInfoList.forEach(userInfo => {
                data.push(this.userInfoMapper.userInfoToDict(userInfo));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.userInfoService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.userInfoService = userInfoService;
    }
}
exports.default = UserInfoController;
