import HotelCommentService from "../../../services/comment/hotelComment/hotelCommentService";
import { Request, Response } from "express";
import { HotelCommentCreate } from "../../../models/comment/HotelComment";
import HotelCommentMapper from "../../../mapper/comment/commentMapper";

class HotelCommentController {
    private readonly hotelCommentService: HotelCommentService;
    private readonly hotelCommentMapper = new HotelCommentMapper();

    constructor(hotelCommentService: HotelCommentService) {
        this.hotelCommentService = hotelCommentService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const hotelComment = await this.hotelCommentService.findById(id);
        if (!hotelComment) {
            return response.status(404).send();
        }

        const dto = this.hotelCommentMapper.commentToDict(hotelComment);
        return response.status(200).json(dto);
    }

    getFindByHotelId = async (request: Request, response: Response) => {
        const hotel_id = Number(request.params.hotel_id);
        const hotelComment = await this.hotelCommentService.findByHotelId(hotel_id);
        if (!hotelComment) {
            return response.status(404).send();
        }

        const dto = this.hotelCommentMapper.commentToDict(hotelComment);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: HotelCommentCreate = request.body;

        try {
            const createdHotelComment = await this.hotelCommentService.create(body);
            const dto = this.hotelCommentMapper.commentToDict(createdHotelComment);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: HotelCommentCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedHotelComment = await this.hotelCommentService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const hotelCommentList = await this.hotelCommentService.findAll()
        if (!hotelCommentList) {
            return response.status(404).send()
        }

        let data: any[] = []

        hotelCommentList.forEach( hotelComment => {
            data.push(this.hotelCommentMapper.commentToDict(hotelComment))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.hotelCommentService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default HotelCommentController;