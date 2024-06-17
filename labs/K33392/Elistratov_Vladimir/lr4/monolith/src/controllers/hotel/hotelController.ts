import HotelService from "../../services/hotel/hotelService";
import { Request, Response } from "express";
import { HotelCreate } from "../../models/hotel/Hotel";
import HotelMapper from "../../mapper/hotel/hotelMapper";

class HotelController {
    private readonly hotelService: HotelService;
    private readonly hotelMapper = new HotelMapper();

    constructor(hotelService: HotelService) {
        this.hotelService = hotelService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const hotel = await this.hotelService.findById(id);
        if (!hotel) {
            return response.status(404).send();
        }

        const dto = this.hotelMapper.hotelToDict(hotel);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: HotelCreate = request.body;

        try {
            const createdHotel = await this.hotelService.create(body);
            const dto = this.hotelMapper.hotelToDict(createdHotel);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: HotelCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedHotel = await this.hotelService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const hotelList = await this.hotelService.findAll()
        if (!hotelList) {
            return response.status(404).send()
        }

        let data: any[] = []

        hotelList.forEach( hotel => {
            data.push(this.hotelMapper.hotelToDict(hotel))
        })

        return response.status(200).json(data)
    }

    listFindAllByCityId = async (request: Request, response: Response) => {
        const city_id = Number(request.params.city_id);
        const hotelList = await this.hotelService.findAllByCityId(city_id)
        if (!hotelList) {
            return response.status(404).send()
        }

        let data: any[] = []

        hotelList.forEach( hotel => {
            data.push(this.hotelMapper.hotelToDict(hotel))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.hotelService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default HotelController;