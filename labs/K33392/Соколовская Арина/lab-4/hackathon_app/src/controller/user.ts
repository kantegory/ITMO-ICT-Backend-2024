import { Request, Response } from "express"
import { UserService } from "../service/user";

const userService = new UserService();

exports.get_hackathons_by_user = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const hackatons = await userService.findUserHackathons(id);
    res.send(JSON.stringify(hackatons));
};

exports.get_active_hackathons_by_user = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};