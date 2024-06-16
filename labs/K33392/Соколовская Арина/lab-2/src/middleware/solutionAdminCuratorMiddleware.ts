import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../model/user";
import { HackathonJuryRepository } from "../repository/hackathonJury";
import { CuratorRepository } from "../repository/curator";
import { SolutionRepository } from "../repository/solution";
import { TeamRepository } from "../repository/team";

const hackathonJuryRepository = new HackathonJuryRepository();
const curatorRepository = new CuratorRepository();
const solutionRepository = new SolutionRepository();
const teamRepository = new TeamRepository();

module.exports = async function (req: Request, res: Response, next: any) {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"})
        }
        
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Unauthorized"})
        }
        
        const parsed = jwt.verify(token, process.env.secret_key as string);
        const user_id = (parsed as User).id;
        const user_role = (parsed as User).role_name;
        const solution_id = Number(req.params.id);

        let access = false;

        if (user_role === "admin"){
            access = true;
        }

        const solution = await solutionRepository.findById(solution_id);
        if (!solution) {
            return res.status(403).json({message: "Solution not found"});
        }
        const team_id = solution.team_id;
        const team = await teamRepository.findByPk(team_id);
        if (!team) {
            return res.status(403).json({message: "Team not found"});
        }
        const hackathon_id = team.task_id;
        const curator = await curatorRepository.findByParams(user_id, hackathon_id);
        if (curator) {
            access = true;
        }

        if (!access) {
            return res.status(403).json({message: "Access Denied"});
        }
        
        next();

    } catch(e) {
        if (e instanceof Error) {
            return res.json(e.message)
        }
    }
}