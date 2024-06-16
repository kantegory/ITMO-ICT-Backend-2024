import BearService from "../../services/bears/service";
import Bear from "../../models/Bear";
import BearError from "../../errors/bears/error";
import { Request, Response } from 'express'


class BearController {
    private bearService: BearService

    constructor() {
        this.bearService = new BearService()
    }

    get = async (req: Request, res: Response) => {
        try {
            const bear: Bear | BearError = await this.bearService.getById(Number(req.params.id))
            res.status(200).send(bear)
        }
        catch (error) {
            res.status(404).send({"error": (error as Error).message})
        }
    }

    post = async(req: Request, res: Response) => {
        try {
            const bear : Bear | BearError = await this.bearService.create(req.body)
            res.status(201).send(bear)
        }
        catch (error) {
            res.status(400).send({"error": (error as Error).message})
        }
    }
}

export default BearController