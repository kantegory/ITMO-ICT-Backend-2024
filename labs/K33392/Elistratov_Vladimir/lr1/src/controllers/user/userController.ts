import UserService from "../../services/user/userService";
import { Request, Response } from "express";
import { UserCreate } from "../../models/user/User";
import UserMapper from "../../mapper/user/userMapper";

class UserController {
    private readonly userService: UserService;
    private readonly userMapper = new UserMapper();

    constructor(userService: UserService) {
        this.userService = userService;
    }

    get = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const user = await this.userService.findById(id);
        if (!user) {
            return response.status(404).send();
        }

        const dto = this.userMapper.userToDict(user);
        return response.status(200).json(dto);
    }

    post = async (request: Request, response: Response) => {
        const body: UserCreate = request.body;

        try {
            const createdUser = await this.userService.create(body);
            const dto = this.userMapper.userToDict(createdUser);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patch = async (request: Request, response: Response) => {
        const body: UserCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedUser = await this.userService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    list = async (request: Request, response: Response) => {
        const userList = await this.userService.list()
        if (!userList) {
            return response.status(404).send()
        }

        let data: any[] = []

        userList.forEach( user => {
            data.push(this.userMapper.userToDict(user))
        })

        return response.status(200).json(data)
    }

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.userService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default UserController;