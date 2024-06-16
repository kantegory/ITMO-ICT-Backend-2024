import {ProfileRepository} from "../../../infrastructure/persistence/profile/repository";
import {Request, Response} from "express";
import {ProfileCreateAttributes, ProfileRestoreAttributes} from "../../../domain/profile/attributes";
import {Factory} from "../../../domain/factory";
import {Profile} from "../../../domain/profile";
import ProfileFactory from "../../../domain/profile/factory";

export default class ProfileController {
    public constructor(private readonly profileRepo: ProfileRepository,
                       private readonly factory: Factory<Profile, ProfileCreateAttributes, ProfileRestoreAttributes>
                           = new ProfileFactory()) {
    }

    public post = async (req: Request, res: Response) => {
        const attributes: ProfileCreateAttributes = {
            name: req.body.name,
            location: req.body.location,
            user: res.locals.user
        };
        let entity = this.factory.create(attributes);
        entity = await this.profileRepo.save(entity);

        return res.status(201).json(entity);
    }

    public get = async (req: Request, res: Response) => {
        const id = req.params['id'];
        const entity = await this.profileRepo.findById(id).catch((e) => {
            res.status(404).json({message: e.message});
            return null;
        });

        if (!entity) {
            return res;
        }

        return res.status(200).json(entity);
    }
}