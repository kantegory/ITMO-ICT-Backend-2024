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

    /**
     * @swagger
     * /v1/profiles:
     *      post:
     *          tags: [Profile]
     *          summary: Create profile
     *          requestBody:
     *              required: true
     *              description: Profile information
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#components/schemas/CreateProfileRequest'
     *          responses:
     *              201:
     *                  description: Profile created successfully
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#components/schemas/ProfileResponse'
     *              400:
     *                   description: Bad request
     *              401:
     *                  description: Not Authorized
     */
    public post = async (req: Request, res: Response) => {
        const attributes: ProfileCreateAttributes = {
            name: req.body.name,
            location: req.body.location,
            user: res.locals.user
        };
        let entity = this.factory.create(attributes);
        entity = await this.profileRepo.save(entity);
        const response = {
            id: entity.id,
            name: entity.name,
            location: entity.location,
            userId: entity.user.id
        }
        return res.status(201).json(response);
    }

    /**
     * @swagger
     * /v1/profiles/{id}:
     *      get:
     *          tags: [Profile]
     *          summary: Find profile by id
     *          parameters:
     *              - name: id
     *                in: path
     *                description: Profile id to find
     *                required: true
     *                schema:
     *                  type: string
     *                  format: uuid
     *          responses:
     *              200:
     *                  description: Profile found
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#components/schemas/ProfileResponse'
     *              400:
     *                   description: Bad request
     *              401:
     *                  description: Not Authorized
     *              403:
     *                  description: Forbidden
     *              404:
     *                  description: Not found
     */
    public get = async (req: Request, res: Response) => {
        const id = req.params['id'];
        const entity = await this.profileRepo.findById(id).catch((e) => {
            res.status(404).json({message: e.message});
            return null;
        });

        if (!entity) {
            return res;
        }

        if (!entity.user.equals(res.locals.user)) {
            return res.status(403).send();
        }

        const response = {
            id: entity.id,
            name: entity.name,
            location: entity.location,
            userId: entity.user.id
        }

        return res.status(200).json(response);
    }
}