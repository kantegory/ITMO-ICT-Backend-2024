import { Request, Response } from "express";
import { HackathonService } from "../service/hackathon";
import { Hackathon } from "../model/task";
import { AdminService } from "../service/admin";

const adminService = new AdminService();


exports.post_hackathon = async (req: Request, res: Response) => {
    try {
        const hackathon = await adminService.post_hackathon(req.body as Hackathon);
        if (hackathon != null) res.send(JSON.stringify(hackathon));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

