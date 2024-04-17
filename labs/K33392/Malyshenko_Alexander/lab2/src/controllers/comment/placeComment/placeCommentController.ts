import PlaceCommentService from "../../../services/comment/placeComment/placeCommentService";
import { Request, Response } from "express";
import { PlaceCommentCreate } from "../../../models/comment/PlaceComment";
import PlaceCommentMapper from "../../../mapper/comment/commentMapper";

class PlaceCommentController {
    private readonly placeCommentService: PlaceCommentService;
    private readonly placeCommentMapper = new PlaceCommentMapper();

    constructor(placeCommentService: PlaceCommentService) {
        this.placeCommentService = placeCommentService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const placeComment = await this.placeCommentService.findById(id);
        if (!placeComment) {
            return response.status(404).send();
        }

        const dto = this.placeCommentMapper.commentToDict(placeComment);
        return response.status(200).json(dto);
    }

    getFindByPlaceId = async (request: Request, response: Response) => {
        const place_id = Number(request.params.place_id);
        const placeComment = await this.placeCommentService.findByPlaceId(place_id);
        if (!placeComment) {
            return response.status(404).send();
        }

        const dto = this.placeCommentMapper.commentToDict(placeComment);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: PlaceCommentCreate = request.body;

        try {
            const createdPlaceComment = await this.placeCommentService.create(body);
            const dto = this.placeCommentMapper.commentToDict(createdPlaceComment);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: PlaceCommentCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedPlaceComment = await this.placeCommentService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const placeCommentList = await this.placeCommentService.findAll()
        if (!placeCommentList) {
            return response.status(404).send()
        }

        let data: any[] = []

        placeCommentList.forEach( placeComment => {
            data.push(this.placeCommentMapper.commentToDict(placeComment))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.placeCommentService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default PlaceCommentController;