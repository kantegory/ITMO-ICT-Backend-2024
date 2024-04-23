import {ProfileRepository} from "../../../infrastructure/persistence/profile/repository";
import {Request, Response} from "express";
import {ProfileCreateAttributes, ProfileRestoreAttributes} from "../../../domain/profile/attributes";
import {Factory} from "../../../domain/factory";
import {Profile} from "../../../domain/profile";
import ProfileFactory from "../../../domain/profile/factory";
import sequelize from "../../../infrastructure/persistence/db";
import {ProfileModel} from "../../../infrastructure/persistence/profile";
import {Repository} from "sequelize-typescript";

export default class ProfileController {
    private readonly repo: Repository<ProfileModel> = sequelize.getRepository(ProfileModel);

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

    /**
     * @swagger
     * /v1/profiles/{id}:
     *      put:
     *          tags: [Profile]
     *          summary: Edit profile by id
     *          parameters:
     *              - name: id
     *                in: path
     *                description: Profile id to edit
     *                required: true
     *                schema:
     *                  type: string
     *                  format: uuid
     *          requestBody:
     *              required: true
     *              description: Profile information
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#components/schemas/CreateProfileRequest'
     *          responses:
     *              200:
     *                  description: Profile edited successfully
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
    put = async (req: Request, res: Response) => {
        const id = req.params['id'];
        const existing = await this.repo.findByPk(id, {include: {all: true}});
        if (!existing) {
            return res.status(404).send();
        }

        if (existing.userId !== res.locals.user.id) {
            return res.status(403).send();
        }

        const updated = await existing.update(req.body);

        const response = {
            id: updated.id,
            name: updated.name,
            location: updated.location,
            userId: updated.userId
        };

        return res.status(200).json(response);
    }

    /**
     * @swagger
     * /v1/profiles/{id}:
     *      delete:
     *          tags: [Profile]
     *          summary: Delete profile by id
     *          parameters:
     *              - name: id
     *                in: path
     *                description: Profile id to delete
     *                required: true
     *                schema:
     *                  type: string
     *                  format: uuid
     *          responses:
     *              204:
     *                  description: Profile deleted
     *              400:
     *                   description: Bad request
     *              401:
     *                  description: Not Authorized
     *              403:
     *                  description: Forbidden
     *              404:
     *                  description: Not found
     */
    delete = async (req: Request, res: Response) => {
        const id = req.params['id'];
        const existing = await this.repo.findByPk(id, {include: {all: true}});
        if (!existing) {
            return res.status(404).send();
        }
        if (existing.userId !== res.locals.user.id) {
            return res.status(403).send();
        }

        await existing.destroy();
        return res.status(204).send();

    }
    /**
     * @swagger
     * /v1/profiles:
     *      get:
     *          tags: [Profile]
     *          summary: Find all profiles owned by user
     *          responses:
     *              200:
     *                  description: Ok
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#components/schemas/ProfileResponse'
     *              401:
     *                  description: Not authorized
     *
     */
    findAll = async (req: Request, res: Response) => {
        const userId: string = res.locals.user.id;
        const models = await this.repo.findAll({
            where: {
                userId: userId
            }
        });

        return res.status(200).json(models.map(m => {
            return {
                id: m.id,
                name: m.name,
                location: m.location,
                userId: m.userId
            };
        }))
    }
}