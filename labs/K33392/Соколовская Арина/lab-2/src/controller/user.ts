import { Request, Response } from "express"
import { UserService } from "../service/user";

const userService = new UserService();

exports.get_user = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await userService.findById(id);
    if (user === null) {
        res
        .status(404)
        .send({ error: 'User with the specified id not found' })
    } else {
        res.send(user.toJSON());
    }
};

exports.patch_user = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};

exports.get_hackathons_by_user = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};

exports.get_active_hackathons_by_user = async (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
};