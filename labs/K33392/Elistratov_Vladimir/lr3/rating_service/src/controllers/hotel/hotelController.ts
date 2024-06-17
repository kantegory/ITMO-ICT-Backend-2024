import HotelService from "../../services/hotel/hotelService";
import { Request, Response } from "express";
import HotelMapper from "../../mapper/hotel/hotelMapper";
import { RatingAdd, RatingAddRequest } from "../../models/rating/Rating";

class HotelController {
    private readonly hotelService: HotelService;
    private readonly hotelMapper = new HotelMapper();

    constructor(hotelService: HotelService) {
        this.hotelService = hotelService;
    }

    addRating = async (request: Request, response: Response) => {
        const body: RatingAddRequest = request.body
        const hotel = await this.hotelService.findById(body.target_id)

        if (!hotel || body.rating > 5 || body.rating < 0) {
            return response.status(400).send()
        }

        const data: RatingAdd = {
            rating: hotel.rating + body.rating,
            amount_of_rates: hotel.amount_of_rates + 1
        }

        try {
            await this.hotelService.addRating(body.target_id, data)
            return response.status(200).json({"message": "updated"})
        } catch (e) {
            return response.status(400).json(e)
        }
    }
}

export default HotelController;