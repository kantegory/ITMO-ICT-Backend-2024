import { Request, Response } from "express"
import { HackathonService } from "../service/hackathon";
import { SolutionService } from "../service/solution";
import { Solution } from "../model/solution";

const solutionService = new SolutionService();

exports.get_solution = async (req: Request, res: Response) => {
    try {
        const solution = await solutionService.findById(Number(req.params.id));
        if (solution != null) res.send(JSON.stringify(solution));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.patch_solution = async (req: Request, res: Response) => {
    try {
        const solution = await solutionService.patch(req.body as Solution)
        if (solution != null) res.send(JSON.stringify(solution));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};