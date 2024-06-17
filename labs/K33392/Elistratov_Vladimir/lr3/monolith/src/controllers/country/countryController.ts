import CountryService from "../../services/country/countryService";
import { Request, Response } from "express";
import { CountryCreate } from "../../models/country/Country";
import CountryMapper from "../../mapper/country/countryMapper";

class CountryController {
    private readonly countryService: CountryService;
    private readonly countryMapper = new CountryMapper();

    constructor(countryService: CountryService) {
        this.countryService = countryService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const country = await this.countryService.findById(id);
        if (!country) {
            return response.status(404).send();
        }

        const dto = this.countryMapper.countryToDict(country);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: CountryCreate = request.body;

        try {
            const createdCountry = await this.countryService.create(body);
            const dto = this.countryMapper.countryToDict(createdCountry);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: CountryCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedCountry = await this.countryService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const countryList = await this.countryService.findAll()
        if (!countryList) {
            return response.status(404).send()
        }

        let data: any[] = []

        countryList.forEach( country => {
            data.push(this.countryMapper.countryToDict(country))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.countryService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default CountryController;