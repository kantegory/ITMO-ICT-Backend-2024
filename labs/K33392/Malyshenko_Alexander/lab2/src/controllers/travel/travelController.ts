import TravelService from "../../services/travel/travelService";
import { Request, Response } from "express";
import { TravelCreate } from "../../models/travel/Travel";
import TravelMapper from "../../mapper/travel/travelMapper";

class TravelController {
    private readonly travelService: TravelService;
    private readonly travelMapper = new TravelMapper();

    constructor(travelService: TravelService) {
        this.travelService = travelService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const travel = await this.travelService.findById(id);
        if (!travel) {
            return response.status(404).send();
        }

        const dto = this.travelMapper.travelToDict(travel);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: TravelCreate = request.body;

        try {
            const createdTravel = await this.travelService.create(body);
            const dto = this.travelMapper.travelToDict(createdTravel);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: TravelCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedTravel = await this.travelService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const travelList = await this.travelService.findAll()
        if (!travelList) {
            return response.status(404).send()
        }

        let data: any[] = []

        travelList.forEach( travel => {
            data.push(this.travelMapper.travelToDict(travel))
        })

        return response.status(200).json(data)
    }

    listFindAllByDepartureCityId = async (request: Request, response: Response) => {
        const dep_city_id = Number(request.params.dep_city_id);
        const travelList = await this.travelService.findAllByDepartureCityId(dep_city_id)
        if (!travelList) {
            return response.status(404).send()
        }

        let data: any[] = []

        travelList.forEach( travel => {
            data.push(this.travelMapper.travelToDict(travel))
        })

        return response.status(200).json(data)
    }

    listFindAllByDestinationAndDepartureCityId = async (request: Request, response: Response) => {
        const dep_city_id = Number(request.params.dep_city_id);
        const dest_city_id = Number(request.params.dest_city_id);
        const travelList = await this.travelService.findAllByDestinationAndDepartureCityId(dep_city_id, dest_city_id)
        if (!travelList) {
            return response.status(404).send()
        }

        let data: any[] = []

        travelList.forEach( travel => {
            data.push(this.travelMapper.travelToDict(travel))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.travelService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default TravelController;