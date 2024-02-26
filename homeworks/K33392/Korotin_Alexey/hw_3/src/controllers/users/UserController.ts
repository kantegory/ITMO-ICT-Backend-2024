import UserService from "../../services/users/UserService";
import {Request, Response} from "express";
import {UserCreationAttributes} from "../../models/users/User";

class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    get = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user = await this.userService.findById(id);
        if (!user) {
            return res.status(404).send();
        }
        return res.status(200).send(user.toJSON());
    }

    post = async (req: Request, res: Response) => {
        const body: UserCreationAttributes = req.body;

        try {
            const createdUser = await this.userService.create(body);
            return res.status(201).send(createdUser.toJSON());
        } catch (e: any) {
            return res.status(400).send({"message": e.message});
        }
    }

    delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const deletedRows = await this.userService.deleteById(id);
        if (deletedRows === 0) {
            return res.status(404).send();
        }

        return res.status(204).send();
    }
}

export default UserController;