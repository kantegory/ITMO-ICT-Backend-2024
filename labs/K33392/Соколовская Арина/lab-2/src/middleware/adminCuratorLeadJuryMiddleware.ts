import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../model/user";
import { HackathonJuryRepository } from "../repository/hackathonJury";
import { CuratorRepository } from "../repository/curator";
import { JuryRepository } from "../repository/jury";
import { TeamRepository } from "../repository/team";

const hackathonJuryRepository = new HackathonJuryRepository();
const curatorRepository = new CuratorRepository();
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
        const hackathon_id = Number(req.params.id);

        let access = false;

        if (user_role === "admin"){
            access = true;
        }

        const curator = await curatorRepository.findByParams(user_id, hackathon_id);
        if (curator) {
            access = true;
        }

        const jury = await hackathonJuryRepository.findByPks(hackathon_id, user_id);
        if (jury) {
            access = true;
        }

        const team = await teamRepository.findByLead(hackathon_id, user_id);
        if (team) {
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