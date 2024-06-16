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
        await axios({
            method: 'get',
            url: 'http://localhost:8000/auth/users/get_id',
            headers: {}, 
            data: {
              token: token,
            }
          }).then((res) => {
            user_id = res.data;
        });

        const team_id = Number(req.params.id);
        const db_team = await teamRepository.findByPk(team_id);
        if (!db_team || db_team.leader_id !== user_id) {
            return res.status(403).json({message: "Access Denied"});
        }

        const team = await teamService.patch(Number(req.params.id), req.body as Team)
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
        await axios({
            method: 'get',
            url: 'http://localhost:8000/auth/users/get_id',
            headers: {}, 
            data: {
              token: token,
            }
          }).then((res) => {
            user_id = res.data;
        });

        console.log("user_id " +user_id);

        const team_id = Number(req.params.id);
        const participant_id = Number(req.params.user_id);


        const db_team = await teamRepository.findByPk(team_id);
        console.log("team_id " +team_id);

        console.log(db_team);
        if (!db_team || db_team.leader_id !== user_id) {
            return res.status(403).json({message: "Access Denied"});
        }
        const participant = await teamService.postParticipant(participant_id, team_id);
        console.log("partincipient posted");
        if (participant != null) res.send(JSON.stringify(participant));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};
