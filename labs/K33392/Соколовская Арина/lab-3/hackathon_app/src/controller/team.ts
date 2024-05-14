import { Request, Response } from "express"
import { TeamService } from "../service/team";
import { Participant, Team } from "../model/team";
import axios from "axios";
import { TeamRepository } from "../repository/team";

const teamService = new TeamService();
const teamRepository = new TeamRepository();

exports.patch_team = async (req: Request, res: Response) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"});
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "Unauthorized"});
        }
        
        let user_id = 0;
        axios.post(`http://localhost:8000/auth/token/${token}/id`).then((resp) => { 
            user_id = resp.data
        });
        const team_id = Number(req.params.id);
        const db_team = await teamRepository.findByPk(team_id);
        if (!db_team || db_team.leader_id !== user_id) {
            return res.status(403).json({message: "Access Denied"});
        }

        const team = await teamService.patch(req.body as Team)
        if (team != null) res.send(JSON.stringify(team));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.post_participant = async (req: Request, res: Response) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"});
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({message: "Unauthorized"});
        }
        
        let user_id = 0;
        axios.post(`http://localhost:8000/auth/token/${token}/id`).then((resp) => { 
            user_id = resp.data
        });
        const team_id = Number(req.params.id);
        const db_team = await teamRepository.findByPk(team_id);
        if (!db_team || db_team.leader_id !== user_id) {
            return res.status(403).json({message: "Access Denied"});
        }
        
        const participant = await teamService.postParticipant(req.body as Participant)
        if (participant != null) res.send(JSON.stringify(participant));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};
