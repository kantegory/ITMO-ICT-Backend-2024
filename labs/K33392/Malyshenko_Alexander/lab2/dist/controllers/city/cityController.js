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
const cityMapper_1 = __importDefault(require("../../mapper/city/cityMapper"));
class CityController {
    constructor(cityService) {
        this.cityMapper = new cityMapper_1.default();
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const city = yield this.cityService.findById(id);
            if (!city) {
                return response.status(404).send();
            }
            const dto = this.cityMapper.cityToDict(city);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdCity = yield this.cityService.create(body);
                const dto = this.cityMapper.cityToDict(createdCity);
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
                const updatedCity = yield this.cityService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const cityList = yield this.cityService.findAll();
            if (!cityList) {
                return response.status(404).send();
            }
            let data = [];
            cityList.forEach(city => {
                data.push(this.cityMapper.cityToDict(city));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.cityService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.getFindByCountryId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const country_id = Number(request.params.country_id);
            const city = yield this.cityService.findByCountryId(country_id);
            if (!city) {
                return response.status(404).send();
            }
            const dto = this.cityMapper.cityToDict(city);
            return response.status(200).json(dto);
        });
        this.cityService = cityService;
    }
}
exports.default = CityController;
