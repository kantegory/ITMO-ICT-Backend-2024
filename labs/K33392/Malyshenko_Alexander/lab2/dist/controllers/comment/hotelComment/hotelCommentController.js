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
const commentMapper_1 = __importDefault(require("../../../mapper/comment/commentMapper"));
class HotelCommentController {
    constructor(hotelCommentService) {
        this.hotelCommentMapper = new commentMapper_1.default();
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const hotelComment = yield this.hotelCommentService.findById(id);
            if (!hotelComment) {
                return response.status(404).send();
            }
            const dto = this.hotelCommentMapper.commentToDict(hotelComment);
            return response.status(200).json(dto);
        });
        this.getFindByHotelId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const hotel_id = Number(request.params.hotel_id);
            const hotelComment = yield this.hotelCommentService.findByHotelId(hotel_id);
            if (!hotelComment) {
                return response.status(404).send();
            }
            const dto = this.hotelCommentMapper.commentToDict(hotelComment);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdHotelComment = yield this.hotelCommentService.create(body);
                const dto = this.hotelCommentMapper.commentToDict(createdHotelComment);
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
                const updatedHotelComment = yield this.hotelCommentService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const hotelCommentList = yield this.hotelCommentService.findAll();
            if (!hotelCommentList) {
                return response.status(404).send();
            }
            let data = [];
            hotelCommentList.forEach(hotelComment => {
                data.push(this.hotelCommentMapper.commentToDict(hotelComment));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.hotelCommentService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.hotelCommentService = hotelCommentService;
    }
}
exports.default = HotelCommentController;
