import { Request, Response } from "express";
import { HackathonService } from "../service/hackathon";

const hackathonService = new HackathonService();

exports.post_hackathon = async (req: Request, res: Response) => {
    try {
        const hackathon = await hackathonService.post(req.body as Hackathon)
        if (hackathon != null) res.send(hackathon.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.post_curator = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};

exports.delete_curator = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};

exports.post_jury = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};

exports.delete_jury = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};

