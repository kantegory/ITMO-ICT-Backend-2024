import { Request, Response } from "express";
import { HackathonService } from "../service/hackathon";
import { Hackathon } from "../model/task";
import { AdminService } from "../service/admin";
import { Curator, Jury } from "../model/user";

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

exports.get_curator = async (req: Request, res: Response) => {
    try {
        const curator = await adminService.get_curator(Number(req.params.user_id));
        if (curator) res.send(JSON.stringify(curator));
        else res.status(404).send({ message: 'Curator not found' })
    } catch(e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
}

exports.post_curator = async (req: Request, res: Response) => {
    try {
        const curator = await adminService.post_curator(req.body as Curator);
        if (curator != null) res.send(JSON.stringify(curator));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.delete_curator = async (req: Request, res: Response) => {
    try {
        await adminService.delete_curator(Number(req.params.user_id));
        res.send({massage : "Curator deleted successfully!"});
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.post_jury = async (req: Request, res: Response) => {
    try {
        const jury = await adminService.post_jury(req.body as Jury, Number(req.params.id));
        if (jury != null) res.send(JSON.stringify(jury));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
}

exports.delete_jury = async (req: Request, res: Response) => {
    try {
        await adminService.delete_jury(Number(req.params.id));
        res.send({massage : "Jury deleted successfully!"});
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
}

