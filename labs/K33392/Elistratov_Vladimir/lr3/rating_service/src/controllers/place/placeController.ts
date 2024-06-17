import PlaceService from "../../services/place/placeService"
import { Request, Response } from "express"
import {Place, PlaceCreate} from "../../models/place/Place"
import PlaceMapper from "../../mapper/place/placeMapper"
import {RatingAdd, RatingAddRequest} from "../../models/rating/Rating";

class PlaceController {
    private readonly placeService: PlaceService
    private readonly placeMapper = new PlaceMapper()

    constructor(placeService: PlaceService) {
        this.placeService = placeService
    }

    addRating = async (request: Request, response: Response) => {
        const body: RatingAddRequest = request.body
        const place = await this.placeService.findById(body.target_id)

        if (!place || body.rating > 5 || body.rating < 0) {
            return response.status(400).send()
        }

        const data: RatingAdd = {
            rating: place.rating + body.rating,
            amount_of_rates: place.amount_of_rates + 1
        }

        try {
            await this.placeService.addRating(body.target_id, data)
            return response.status(200).json({"message": "updated"})
        } catch (e) {
            return response.status(400).json(e)
        }
    }
}

export default PlaceController