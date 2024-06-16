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
const travelUserLinkMapper_1 = __importDefault(require("../../../mapper/link/travelUserLink/travelUserLinkMapper"));
class TravelUserLinkController {
    constructor(travelUserLinkService) {
        this.travelUserLinkMapper = new travelUserLinkMapper_1.default();
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const travelUserLink = yield this.travelUserLinkService.findById(id);
            if (!travelUserLink) {
                return response.status(404).send();
            }
            const dto = this.travelUserLinkMapper.travelUserLinkToDict(travelUserLink);
            return response.status(200).json(dto);
        });
        this.getFindByUserId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user_id = Number(request.params.user_id);
            const travelUserLink = yield this.travelUserLinkService.findByUserId(user_id);
            if (!travelUserLink) {
                return response.status(404).send();
            }
            const dto = this.travelUserLinkMapper.travelUserLinkToDict(travelUserLink);
            return response.status(200).json(dto);
        });
        this.getFindByTravelId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const travel_id = Number(request.params.travel_id);
            const travelUserLink = yield this.travelUserLinkService.findByUserId(travel_id);
            if (!travelUserLink) {
                return response.status(404).send();
            }
            const dto = this.travelUserLinkMapper.travelUserLinkToDict(travelUserLink);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdTravelUserLink = yield this.travelUserLinkService.create(body);
                const dto = this.travelUserLinkMapper.travelUserLinkToDict(createdTravelUserLink);
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
                const updatedTravelUserLink = yield this.travelUserLinkService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const travelUserLinkList = yield this.travelUserLinkService.findAll();
            if (!travelUserLinkList) {
                return response.status(404).send();
            }
            let data = [];
            travelUserLinkList.forEach(travelUserLink => {
                data.push(this.travelUserLinkMapper.travelUserLinkToDict(travelUserLink));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.travelUserLinkService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.travelUserLinkService = travelUserLinkService;
    }
}
exports.default = TravelUserLinkController;
