import CityService from "../../services/city/cityService"
import { Request, Response } from "express"
import { CityCreate } from "../../models/city/City"
import CityMapper from "../../mapper/city/cityMapper"
import PlaceService from "../../services/place/placeService";

class CityController {
    private readonly cityService: CityService
    private readonly placeService: PlaceService
    private readonly cityMapper = new CityMapper()

    constructor(cityService: CityService, placeService: PlaceService) {
        this.cityService = cityService
        this.placeService = placeService
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const city = await this.cityService.findById(id)
        if (!city) {
            return response.status(404).send()
        }

        const dto = this.cityMapper.cityToDict(city)
        return response.status(200).json({"city": dto, "recommendation": true})
    }

    postCreate = async (request: Request, response: Response) => {
        const body: CityCreate = request.body

        try {
            const createdCity = await this.cityService.create(body)
            const dto = this.cityMapper.cityToDict(createdCity)
            return response.status(201).send(dto)

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: CityCreate = request.body
        const id = Number(request.params.id)
        try {
            const updatedCity = await this.cityService.updateById(id, body)
            return response.status(200).send({"message": "Updated"})

        } catch (e: any) {
            return response.status(400).send({"message": e.message})
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const cityList = await this.cityService.findAll()
        if (!cityList) {
            return response.status(404).send()
        }

        let data: any[] = []

        cityList.forEach( city => {
            data.push(this.cityMapper.cityToDict(city))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        const deletedRows = await this.cityService.deleteById(id)
        if (deletedRows === 0) {
            return response.status(404).send()
        }

        return response.status(204).send()
    }

    getFindAllByCountryId = async (request: Request, response: Response) => {
        const country_id = Number(request.params.country_id)
        const cityList = await this.cityService.findByCountryId(country_id)
        if (!cityList) {
            return response.status(404).send()
        }

        let data: any[] = []

        cityList.forEach( city => {
            data.push(this.cityMapper.cityToDict(city))
        })

        return response.status(200).json(data)
    }
}

export default CityController