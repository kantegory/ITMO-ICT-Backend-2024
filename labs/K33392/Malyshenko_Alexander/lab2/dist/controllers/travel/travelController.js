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
const travelMapper_1 = __importDefault(require("../../mapper/travel/travelMapper"));
class TravelController {
    constructor(travelService) {
        this.travelMapper = new travelMapper_1.default();
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const travel = yield this.travelService.findById(id);
            if (!travel) {
                return response.status(404).send();
            }
            const dto = this.travelMapper.travelToDict(travel);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdTravel = yield this.travelService.create(body);
                const dto = this.travelMapper.travelToDict(createdTravel);
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
                const updatedTravel = yield this.travelService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const travelList = yield this.travelService.findAll();
            if (!travelList) {
                return response.status(404).send();
            }
            let data = [];
            travelList.forEach(travel => {
                data.push(this.travelMapper.travelToDict(travel));
            });
            return response.status(200).json(data);
        });
        this.listFindAllByDepartureCityId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const dep_city_id = Number(request.params.dep_city_id);
            const travelList = yield this.travelService.findAllByDepartureCityId(dep_city_id);
            if (!travelList) {
                return response.status(404).send();
            }
            let data = [];
            travelList.forEach(travel => {
                data.push(this.travelMapper.travelToDict(travel));
            });
            return response.status(200).json(data);
        });
        this.listFindAllByDestinationAndDepartureCityId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const dep_city_id = Number(request.params.dep_city_id);
            const dest_city_id = Number(request.params.dest_city_id);
            const travelList = yield this.travelService.findAllByDestinationAndDepartureCityId(dep_city_id, dest_city_id);
            if (!travelList) {
                return response.status(404).send();
            }
            let data = [];
            travelList.forEach(travel => {
                data.push(this.travelMapper.travelToDict(travel));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.travelService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.travelService = travelService;
    }
}
exports.default = TravelController;
