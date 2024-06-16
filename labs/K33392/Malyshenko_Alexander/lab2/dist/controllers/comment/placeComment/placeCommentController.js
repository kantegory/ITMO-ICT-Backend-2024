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
class PlaceCommentController {
    constructor(placeCommentService) {
        this.placeCommentMapper = new commentMapper_1.default();
        this.getFindById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const placeComment = yield this.placeCommentService.findById(id);
            if (!placeComment) {
                return response.status(404).send();
            }
            const dto = this.placeCommentMapper.commentToDict(placeComment);
            return response.status(200).json(dto);
        });
        this.getFindByPlaceId = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const place_id = Number(request.params.place_id);
            const placeComment = yield this.placeCommentService.findByPlaceId(place_id);
            if (!placeComment) {
                return response.status(404).send();
            }
            const dto = this.placeCommentMapper.commentToDict(placeComment);
            return response.status(200).json(dto);
        });
        this.postCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const createdPlaceComment = yield this.placeCommentService.create(body);
                const dto = this.placeCommentMapper.commentToDict(createdPlaceComment);
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
                const updatedPlaceComment = yield this.placeCommentService.updateById(id, body);
                return response.status(200).send({ "message": "Updated" });
            }
            catch (e) {
                return response.status(400).send({ "message": e.message });
            }
        });
        this.listFindAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const placeCommentList = yield this.placeCommentService.findAll();
            if (!placeCommentList) {
                return response.status(404).send();
            }
            let data = [];
            placeCommentList.forEach(placeComment => {
                data.push(this.placeCommentMapper.commentToDict(placeComment));
            });
            return response.status(200).json(data);
        });
        this.deleteById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const deletedRows = yield this.placeCommentService.deleteById(id);
            if (deletedRows === 0) {
                return response.status(404).send();
            }
            return response.status(204).send();
        });
        this.placeCommentService = placeCommentService;
    }
}
exports.default = PlaceCommentController;
