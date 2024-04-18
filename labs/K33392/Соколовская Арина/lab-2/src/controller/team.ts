import { Request, Response } from "express"
import { TeamService } from "../service/team";
import { Participant, Team } from "../model/team";

const teamService = new TeamService();

exports.patch_team = async (req: Request, res: Response) => {
    try {
        const team = await teamService.patch(req.body as Team)
        if (team != null) res.send(team.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.post_participant = async (req: Request, res: Response) => {
    try {
        const participant = await teamService.postParticipant(req.body as Participant)
        if (participant != null) res.send(participant.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};
