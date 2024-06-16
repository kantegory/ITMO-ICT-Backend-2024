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
const hotelMapper_1 = __importDefault(require("../../mapper/hotel/hotelMapper"));
class HotelController {
    constructor(hotelService) {
        this.hotelMapper = new hotelMapper_1.default();
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const hotel = yield this.hotelService.findById(id);
            if (!hotel) {
                return response.status(404).send();
            }
            const dto = this.hotelMapper.hotelToDict(hotel);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdHotel = yield this.hotelService.create(body);
                const dto = this.hotelMapper.hotelToDict(createdHotel);
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
                const updatedHotel = yield this.hotelService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const hotelList = yield this.hotelService.findAll();
            if (!hotelList) {
                return response.status(404).send();
            }
            let data = [];
            hotelList.forEach(hotel => {
                data.push(this.hotelMapper.hotelToDict(hotel));
            });
            return response.status(200).json(data);
        });
        this.listFindAllByCityId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const city_id = Number(request.params.city_id);
            const hotelList = yield this.hotelService.findAllByCityId(city_id);
            if (!hotelList) {
                return response.status(404).send();
            }
            let data = [];
            hotelList.forEach(hotel => {
                data.push(this.hotelMapper.hotelToDict(hotel));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.hotelService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.hotelService = hotelService;
    }
}
exports.default = HotelController;
