import UserService from "../../services/users/UserService";
import {Request, Response} from "express";
import {User, UserCreationAttributes} from "../../models/users/User";
import Mapper from "../../mappers/Mapper";
import UserMapper from "../../mappers/users/UserMapper";

class UserController {
    private readonly userService: UserService;
    private readonly userMapper: Mapper<User> = new UserMapper();

    constructor(userService: UserService) {
        this.userService = userService;
    }
    get = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user = await this.userService.findById(id);
        if (!user) {
            return res.status(404).send();
        }

        const dto = this.userMapper.toDto(user);

        return res.status(200).json(dto);
    }

    post = async (req: Request, res: Response) => {
        const body: UserCreationAttributes = req.body;

        try {
            const createdUser = await this.userService.create(body);
            const dto = this.userMapper.toDto(createdUser);
            return res.status(201).send(dto);
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