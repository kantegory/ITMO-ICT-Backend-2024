import TransportService from "../../services/transport/transportService";
import { Request, Response } from "express";
import { TransportCreate } from "../../models/transport/Transport";
import TransportMapper from "../../mapper/transport/transportMapper";

class TransportController {
    private readonly transportService: TransportService;
    private readonly transportMapper = new TransportMapper();

    constructor(transportService: TransportService) {
        this.transportService = transportService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const transport = await this.transportService.findById(id);
        if (!transport) {
            return response.status(404).send();
        }

        const dto = this.transportMapper.transportToDict(transport);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: TransportCreate = request.body;

        try {
            const createdTransport = await this.transportService.create(body);
            const dto = this.transportMapper.transportToDict(createdTransport);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: TransportCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedTransport = await this.transportService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const transportList = await this.transportService.findAll()
        if (!transportList) {
            return response.status(404).send()
        }

        let data: any[] = []

        transportList.forEach( transport => {
            data.push(this.transportMapper.transportToDict(transport))
        })

        return response.status(200).json(data)
    }

    listFindAllByUserId = async (request: Request, response: Response) => {
        const user_id = Number(request.params.user_id);
        const transportList = await this.transportService.findAllByUserId(user_id);
        if (!transportList) {
            return response.status(404).send()
        }

        let data: any[] = []

        transportList.forEach( transport => {
            data.push(this.transportMapper.transportToDict(transport))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.transportService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default TransportController;