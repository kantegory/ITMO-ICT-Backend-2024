import UserCommentService from "../../../services/comment/userComment/userCommentService";
import { Request, Response } from "express";
import { UserCommentCreate } from "../../../models/comment/UserComment";
import UserCommentMapper from "../../../mapper/comment/commentMapper";

class UserCommentController {
    private readonly userCommentService: UserCommentService;
    private readonly userCommentMapper = new UserCommentMapper();

    constructor(userCommentService: UserCommentService) {
        this.userCommentService = userCommentService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const userComment = await this.userCommentService.findById(id);
        if (!userComment) {
            return response.status(404).send();
        }

        const dto = this.userCommentMapper.commentToDict(userComment);
        return response.status(200).json(dto);
    }

    getFindByUserId = async (request: Request, response: Response) => {
        const user_id = Number(request.params.user_id);
        const userComment = await this.userCommentService.findByUserId(user_id);
        if (!userComment) {
            return response.status(404).send();
        }

        const dto = this.userCommentMapper.commentToDict(userComment);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: UserCommentCreate = request.body;

        try {
            const createdUserComment = await this.userCommentService.create(body);
            const dto = this.userCommentMapper.commentToDict(createdUserComment);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: UserCommentCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedUserComment = await this.userCommentService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const userCommentList = await this.userCommentService.findAll()
        if (!userCommentList) {
            return response.status(404).send()
        }

        let data: any[] = []

        userCommentList.forEach( userComment => {
            data.push(this.userCommentMapper.commentToDict(userComment))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.userCommentService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default UserCommentController;