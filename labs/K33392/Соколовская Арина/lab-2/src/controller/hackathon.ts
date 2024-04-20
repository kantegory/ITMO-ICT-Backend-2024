import { Request, Response } from "express"
import { HackathonService } from "../service/hackathon";
import { Hackathon } from "../model/task";
import { Team } from "../model/team";
import { Solution } from "../model/solution";

const hackathonService = new HackathonService();

exports.get_hackathons = async (req: Request, res: Response) => {
    try {
        const hackathons = await hackathonService.findAll();
        if (hackathons != null) res.send(hackathons);
    } catch(e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }  
    }
}

exports.get_hackathon = async (req: Request, res: Response) => {
    try {
        const hackathon = await hackathonService.findById(req.body.id)
        if (hackathon != null) res.send(hackathon.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.post_hackathon_team = async (req: Request, res: Response) => {
    try {
        const team = await hackathonService.postTeam(req.body as Team)
        if (team != null) res.send(JSON.stringify(team));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.get_hackathon_task = async (req: Request, res: Response) => {
    try {
        const task = await hackathonService.findTaskById(req.body.id)
        if (task != null) res.send(task.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.patch_hackathon_task = async (req: Request, res: Response) => {
    try {
        const task = await hackathonService.patch(req.body as Hackathon)
        if (task != null) res.send(JSON.stringify(task));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.post_hackathon_solution = async (req: Request, res: Response) => {
    try {
        const solution = await hackathonService.postSolution(req.body as Solution);
        if (solution != null) res.send(JSON.stringify(solution));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};
