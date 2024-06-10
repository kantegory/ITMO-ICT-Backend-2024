import { error } from "console";
import AuthServis from "../../service/auth";
import { Request, Response } from "express";

export default class AuthControll{
    private authcontroll: AuthServis;

    constructor() {
        this.authcontroll = new AuthServis();
    }

    register = async (req: Request, res: Response) => {
        try{
            const result = await this.authcontroll.register(req.body);
            res.status(200).send(result);
        }catch{
            res.status(400).send(error);
        }
    };

    auth = async (req: Request, res: Response) => {
        try{
            const result = await this.authcontroll.auth(req.body.email, req.body.password);
            res.status(200).send(result);
        }catch{
            res.status(400).send(error);
        }
    }
}