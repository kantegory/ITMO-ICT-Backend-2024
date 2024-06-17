import UserInfoService from "../../services/userInfo/userInfoService";
import { Request, Response } from "express";
import { UserInfoCreate } from "../../models/userInfo/UserInfo";
import UserInfoMapper from "../../mapper/userInfo/userInfoMapper";

class UserInfoController {
    private readonly userInfoService: UserInfoService;
    private readonly userInfoMapper = new UserInfoMapper();

    constructor(userInfoService: UserInfoService) {
        this.userInfoService = userInfoService;
    }

    getFindById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const userInfo = await this.userInfoService.findById(id);
        if (!userInfo) {
            return response.status(404).send();
        }

        const dto = this.userInfoMapper.userInfoToDict(userInfo);
        return response.status(200).json(dto);
    }

    getFindByUserId = async (request: Request, response: Response) => {
        const user_id = Number(request.params.user_id);
        const userInfo = await this.userInfoService.findByUserId(user_id);
        if (!userInfo) {
            return response.status(404).send();
        }

        const dto = this.userInfoMapper.userInfoToDict(userInfo);
        return response.status(200).json(dto);
    }

    postCreate = async (request: Request, response: Response) => {
        const body: UserInfoCreate = request.body;

        try {
            const createdUserInfo = await this.userInfoService.create(body);
            const dto = this.userInfoMapper.userInfoToDict(createdUserInfo);
            return response.status(201).send(dto);

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    patchUpdateById = async (request: Request, response: Response) => {
        const body: UserInfoCreate = request.body;
        const id = Number(request.params.id);
        try {
            const updatedUserInfo = await this.userInfoService.updateById(id, body);
            return response.status(200).send({"message": "Updated"});

        } catch (e: any) {
            return response.status(400).send({"message": e.message});
        }
    }

    listFindAll = async (request: Request, response: Response) => {
        const userInfoList = await this.userInfoService.findAll()
        if (!userInfoList) {
            return response.status(404).send()
        }

        let data: any[] = []

        userInfoList.forEach( userInfo => {
            data.push(this.userInfoMapper.userInfoToDict(userInfo))
        })

        return response.status(200).json(data)
    }

    deleteById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const deletedRows = await this.userInfoService.deleteById(id);
        if (deletedRows === 0) {
            return response.status(404).send();
        }

        return response.status(204).send();
    }
}

export default UserInfoController;