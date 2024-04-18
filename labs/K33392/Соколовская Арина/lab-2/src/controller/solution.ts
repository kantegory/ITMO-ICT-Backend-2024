import { Request, Response } from "express"
import { HackathonService } from "../service/hackathon";

const hackathonService = new HackathonService();

exports.get_solution = async (req: Request, res: Response) => {
    try {
        const task = await hackathonService.findTaskById(req.body.id)
        if (task != null) res.send(task.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.patch_solution = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};