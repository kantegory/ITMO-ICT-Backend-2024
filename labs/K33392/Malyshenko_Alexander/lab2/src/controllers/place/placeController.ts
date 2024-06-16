import PlaceService from "../../services/place/placeService";
import { Request, Response } from "express";
import { PlaceCreate } from "../../models/place/Place";
import PlaceMapper from "../../mapper/place/placeMapper";

class PlaceController {
    private readonly placeService: PlaceService;
    private readonly placeMapper = new PlaceMapper();

    constructor(placeService: PlaceService) {
        this.placeService = placeService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const place = await this.placeService.findById(id);
        if (!place) {
            return response.status(404).send();
        }

        const dto = this.placeMapper.placeToDict(place);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: PlaceCreate = request.body;

        try {
            const createdPlace = await this.placeService.create(body);
            const dto = this.placeMapper.placeToDict(createdPlace);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: PlaceCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedPlace = await this.placeService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const placeList = await this.placeService.findAll()
        if (!placeList) {
            return response.status(404).send()
        }

        let data: any[] = []

        placeList.forEach( place => {
            data.push(this.placeMapper.placeToDict(place))
        })

        return response.status(200).json(data)
    }

    listFindAllByCityId = async (request: Request, response: Response) => {
        const city_id = Number(request.params.city_id);
        const placeList = await this.placeService.findAllByCityId(city_id)
        if (!placeList) {
            return response.status(404).send()
        }

        let data: any[] = []

        placeList.forEach( place => {
            data.push(this.placeMapper.placeToDict(place))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.placeService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default PlaceController;