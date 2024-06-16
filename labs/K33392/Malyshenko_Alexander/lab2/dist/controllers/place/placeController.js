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
const placeMapper_1 = __importDefault(require("../../mapper/place/placeMapper"));
class PlaceController {
    constructor(placeService) {
        this.placeMapper = new placeMapper_1.default();
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const place = yield this.placeService.findById(id);
            if (!place) {
                return response.status(404).send();
            }
            const dto = this.placeMapper.placeToDict(place);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdPlace = yield this.placeService.create(body);
                const dto = this.placeMapper.placeToDict(createdPlace);
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
                const updatedPlace = yield this.placeService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const placeList = yield this.placeService.findAll();
            if (!placeList) {
                return response.status(404).send();
            }
            let data = [];
            placeList.forEach(place => {
                data.push(this.placeMapper.placeToDict(place));
            });
            return response.status(200).json(data);
        });
        this.listFindAllByCityId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const city_id = Number(request.params.city_id);
            const placeList = yield this.placeService.findAllByCityId(city_id);
            if (!placeList) {
                return response.status(404).send();
            }
            let data = [];
            placeList.forEach(place => {
                data.push(this.placeMapper.placeToDict(place));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.placeService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.placeService = placeService;
    }
}
exports.default = PlaceController;
