import TravelUserLinkService from "../../../services/links/travelUserLink/travelUserLinkService";
import { Request, Response } from "express";
import { TravelUserLinkCreate } from "../../../models/links/TravelUserLink";
import TravelUserLinkMapper from "../../../mapper/link/travelUserLink/travelUserLinkMapper";

class TravelUserLinkController {
    private readonly travelUserLinkService: TravelUserLinkService;
    private readonly travelUserLinkMapper = new TravelUserLinkMapper();

    constructor(travelUserLinkService: TravelUserLinkService) {
        this.travelUserLinkService = travelUserLinkService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const travelUserLink = await this.travelUserLinkService.findById(id);
        if (!travelUserLink) {
            return response.status(404).send();
        }

        const dto = this.travelUserLinkMapper.travelUserLinkToDict(travelUserLink);
        return response.status(200).json(dto);
    }

    getFindByUserId = async (request: Request, response: Response) => {
        const user_id = Number(request.params.user_id);
        const travelUserLink = await this.travelUserLinkService.findByUserId(user_id);
        if (!travelUserLink) {
            return response.status(404).send();
        }

        const dto = this.travelUserLinkMapper.travelUserLinkToDict(travelUserLink);
        return response.status(200).json(dto);
    }

    getFindByTravelId = async (request: Request, response: Response) => {
        const travel_id = Number(request.params.travel_id);
        const travelUserLink = await this.travelUserLinkService.findByUserId(travel_id);
        if (!travelUserLink) {
            return response.status(404).send();
        }

        const dto = this.travelUserLinkMapper.travelUserLinkToDict(travelUserLink);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: TravelUserLinkCreate = request.body;

        try {
            const createdTravelUserLink = await this.travelUserLinkService.create(body);
            const dto = this.travelUserLinkMapper.travelUserLinkToDict(createdTravelUserLink);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: TravelUserLinkCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedTravelUserLink = await this.travelUserLinkService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const travelUserLinkList = await this.travelUserLinkService.findAll()
        if (!travelUserLinkList) {
            return response.status(404).send()
        }

        let data: any[] = []

        travelUserLinkList.forEach( travelUserLink => {
            data.push(this.travelUserLinkMapper.travelUserLinkToDict(travelUserLink))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.travelUserLinkService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default TravelUserLinkController;