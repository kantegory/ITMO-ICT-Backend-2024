import { Request, Response } from "express";
import { GradingRepository } from "../repository/grading";
import { GradingService } from "../service/grading";
import { Grading } from "../model/solution";

const gradingService = new GradingService();

exports.post_grading = async (req: Request, res: Response) => {
    try {
        const grading = await gradingService.post(req.body as Grading)
        if (grading != null) res.send(JSON.stringify(grading));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.get_gradings = async (req: Request, res: Response) => {
    try {
        const gradings = await gradingService.get_gradings(req.body.id)
        if (gradings != null) res.send(gradings);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.get_sorted_gradings = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};