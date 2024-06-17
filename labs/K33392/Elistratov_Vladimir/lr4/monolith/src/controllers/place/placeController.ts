import PlaceService from "../../services/place/placeService"
import { Request, Response } from "express"
import {Place, PlaceCreate, PlaceRecommendationAttributes} from "../../models/place/Place"
import PlaceMapper from "../../mapper/place/placeMapper"
import {RatingAdd, RatingAddRequest} from "../../models/rating/Rating";

class PlaceController {
    private readonly placeService: PlaceService
    private readonly placeMapper = new PlaceMapper()

    constructor(placeService: PlaceService) {
        this.placeService = placeService
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const place = await this.placeService.findById(id)
        if (!place) {
            return response.status(404).send()
        }

        const dto = this.placeMapper.placeToDict(place)
        return response.status(200).json(dto)
    }

    postCreate = async (request: Request, response: Response) => {
        const body: PlaceCreate = request.body

        try {
            const createdPlace = await this.placeService.create(body)
            const dto = this.placeMapper.placeToDict(createdPlace)
            return response.status(201).send(dto)

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: PlaceCreate = request.body
        const id = Number(request.params.id)
        try {
            const updatedPlace = await this.placeService.updateById(id, body)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
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
        const body: PlaceRecommendationAttributes = request.body
        const placeList = await this.placeService.findAllByCityId(
            body.city_id,
            body.sorted ? true : body.sorted,
            body.limit ? body.limit : 5
        )

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
        const id = Number(request.params.id)
        const deletedRows = await this.placeService.deleteById(id)
        if (deletedRows === 0) {
            return response.status(404).send()
        }

        return response.status(204).send()
    }

    addRating = async (request: Request, response: Response) => {
        const body: RatingAddRequest = request.body
        const place = await this.placeService.findById(body.place_id)

        if (!place || body.rating > 5 || body.rating < 0) {
            return response.status(400).send()
        }

        const data: RatingAdd = {
            rating: place.rating + body.rating,
            amount_of_rates: place.amount_of_rates + 1
        }

        try {
            await this.placeService.addRating(body.place_id, data)
            return response.status(200).json({"message": "updated"})
        } catch (e) {
            return response.status(400).json(e)
        }
    }
}

export default PlaceController