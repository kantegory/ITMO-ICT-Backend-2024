import { Request, Response } from "express";
import { HackathonService } from "../service/hackathon";
import { Hackathon } from "../model/task";
import { AdminService } from "../service/admin";
import { Curator, Jury } from "../model/user";

const adminService = new AdminService();


exports.post_hackathon = async (req: Request, res: Response) => {
    try {
        const hackathon = await adminService.post_hackathon(req.body as Hackathon)
        if (hackathon != null) res.send(hackathon.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.post_curator = async (req: Request, res: Response) => {
    try {
        const curator = await adminService.post_curator(req.body as Curator)
        if (curator != null) res.send(curator.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.delete_curator = async (req: Request, res: Response) => {
    try {
        await adminService.delete_curator(req.body.id)
        res.send({massage : "Curator deleted successfully!"});
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.post_jury = async (req: Request, res: Response) => {
    try {
        const jury = await adminService.post_jury(req.body as Jury)
        if (jury != null) res.send(jury.toJSON);
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
}

exports.delete_jury = async (req: Request, res: Response) => {
    try {
        await adminService.delete_jury(req.body.id)
        res.send({massage : "Jury deleted successfully!"});
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
}

