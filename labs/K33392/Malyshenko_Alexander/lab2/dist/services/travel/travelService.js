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
const database_1 = __importDefault(require("../../database/database"));
const Travel_1 = require("../../models/travel/Travel");
class TravelService {
    constructor() {
        this.travelRepository = database_1.default.getRepository(Travel_1.Travel);
    }
    create(data) {
        try {
            return this.travelRepository.create(data);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    deleteById(id) {
        return this.travelRepository.destroy({
            where: {
                id: id
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.travelRepository.findOne({
                where: {
                    id: id
                }
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.travelRepository.findAll();
        });
    }
    findAllByDepartureCityId(dep_city_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.travelRepository.findAll({
                where: {
                    departure_city: dep_city_id
                }
            });
        });
    }
    findAllByDestinationAndDepartureCityId(dep_city_id, dest_city_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.travelRepository.findAll({
                where: {
                    departure_city: dep_city_id,
                    destination_city: dep_city_id
                }
            });
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.travelRepository.update(data, {
                where: {
                    id: id
                },
                returning: true
            });
            if (result[0] === 0) {
                return Promise.reject({ message: "Not found" });
            }
            return Promise.resolve(result[1][0]);
        });
    }
}
exports.default = TravelService;
