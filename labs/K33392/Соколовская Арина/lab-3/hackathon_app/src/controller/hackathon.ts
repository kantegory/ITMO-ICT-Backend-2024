import { Request, Response } from "express"
import { HackathonService } from "../service/hackathon";
import { Hackathon } from "../model/task";
import { Team } from "../model/team";
import { Solution } from "../model/solution";
import { TeamRepository } from "../repository/team";
import axios from "axios";

const hackathonService = new HackathonService();
const teamRepository = new TeamRepository();

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
        const hackathon = await hackathonService.findById(Number(req.params.id))
        if (hackathon != null) res.send(JSON.stringify(hackathon));
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
        const allowed = ['admin', 'curator', 'jury'];
        let user_role = "";

        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"});
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Unauthorized"});
        }

        axios.post(`http://localhost:8000/auth/token/${token}`).then((resp) => {
            user_role = resp.data;
        });
        if (!allowed.includes(user_role)) {
            const hackathon_id = Number(req.params.id);
            let user_id = 0;
            axios.post(`http://localhost:8000/auth/token/${token}/id`).then((resp) => {
                user_id = resp.data;
            });

            const team = await teamRepository.findByLead(hackathon_id, user_id);
            if (!team) {
                return res.status(403).json({message: "Access Denied"});
            }
        }

        const task = await hackathonService.findTaskById(Number(req.params.id))
        if (task != null) res.send(JSON.stringify(task));
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
        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"});
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Unauthorized"});
        }
        const hackathon_id = Number(req.params.id);
        
        let user_id = 0;
        axios.post(`http://localhost:8000/auth/token/${token}/id`).then((resp) => {
            user_id = resp.data;
        });

        const team = await teamRepository.findByLead(hackathon_id, user_id);
        if (!team) {
            return res.status(403).json({message: "Access Denied"});
        }

        const solution = await hackathonService.postSolution(req.body as Solution);
        if (solution != null) res.send(JSON.stringify(solution));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};
