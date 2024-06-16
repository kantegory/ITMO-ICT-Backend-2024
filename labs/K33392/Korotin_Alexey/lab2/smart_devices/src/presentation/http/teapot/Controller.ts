import {TeapotRepository} from "../../../infrastructure/persistence/devices/teapot/repository";
import {Request, Response} from "express";
import {TeapotCreateAttributes} from "../../../domain/devices/teapot/attributes";
import TeapotFactory from "../../../domain/devices/teapot/factory";
import {Profile} from "../../../domain/profile";
import sequelize from "../../../infrastructure/persistence/db";
import {TeapotModel} from "../../../infrastructure/persistence/devices/teapot";
import {toUnicode} from "node:punycode";
import {TeapotSubscriptionRepository} from "../../../infrastructure/persistence/devices/teapot/subscription/repository";
import {LoggingTeapotSubscription} from "../../../domain/devices/teapot/Subscription";
import {v4} from "uuid";
import {Teapot, TeapotEventType} from "../../../domain/devices/teapot";
import {
    TeapotSubscriptionModel
} from "../../../infrastructure/persistence/devices/teapot/subscription/TeapotSubscription";
import {EventSubscriptionMapper} from "../../../infrastructure/persistence/event_subscriptions/mapper";
import {Repository} from "sequelize-typescript";
import {TeapotResponse, TeapotSubscription} from "./schema";
import {EventSubscriptionModel} from "../../../infrastructure/persistence/event_subscriptions";

export class TeapotController {
    private readonly repository: Repository<TeapotModel> = sequelize.getRepository(TeapotModel);

    public constructor(private readonly repo: TeapotSubscriptionRepository) {
    }

    /**
     * @swagger
     * /v1/devices/teapots:
     *      post:
     *          tags: [Teapots]
     *          summary: Create smart teapot device
     *          requestBody:
     *              required: true
     *              description: Smart teapot data
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#components/schemas/CreateTeapotRequest'
     *          responses:
     *              201:
     *                  description: Teapot successfully created
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#components/schemas/TeapotResponse'
     *
     */
    public post = async (req: Request, res: Response) => {
        const attributes: TeapotCreateAttributes = {
            ...req.body,
            profile: new Profile(req.body.profileId, "", "", res.locals.user)
        }

        const entity = new TeapotFactory().create(attributes);

        const createAttributes = {
            id: entity.id,
            name: entity.name,
            profileId: entity.linkedProfile.id,
            temperature: entity.temperature,
            capacity: entity.capacity,
            waterSupply: entity.waterSupply,
            state: entity.state

        }

        const teapotRepo = sequelize.getRepository(TeapotModel);
        try {
            const model = await teapotRepo.create(createAttributes, {include: ['subscriptions']})
                .then(m => m.reload());

            return res.status(201).json(model);
        } catch (e: any) {
            return res.status(400).send({message: e.message});
        }
    }

    /**
     * @swagger
     * /v1/devices/teapots/{id}:
     *      get:
     *          tags: [Teapots]
     *          summary: Find teapot by id
     *          parameters:
     *              - name: id
     *                in: path
     *                description: Teapot id to find
     *                required: true
     *                schema:
     *                  type: string
     *                  format: uuid
     *          responses:
     *              200:
     *                  description: Ok
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#components/schemas/TeapotResponse'
     *              401:
     *                  description: Not authorized
     *              403:
     *                  description: Forbidden
     *              404:
     *                  description: Not found
     */
    public get = async (req: Request, res: Response) => {
        const id = req.params.teapotId;
        const teapot = await this.repository.findByPk(id, {include: ['profile']})
            .then(m => m?.reload());


        if (!teapot) {
            return res.status(404).send();
        }
        if (teapot.profile.userId !== res.locals.user.id) {
            return res.status(403).send();
        }

        const subs = await this.repo.findAllByTeapotId(id);

        const result = {
            ...teapot.dataValues,
            subscriptions: subs.map(mapSubs)
        }

        delete result.profile;

        return res.status(200).json(result);
    }
    /**
     *  @swagger
     *  /v1/devices/teapots/{id}/subscriptions:
     *      post:
     *          tags: [Teapots]
     *          summary: Add subscription
     *          parameters:
     *              - name: id
     *                in: path
     *                description: Teapot id
     *                required: true
     *                schema:
     *                  type: string
     *                  format: uuid
     *          requestBody:
     *              required: true
     *              description: Event type
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              eventType:
     *                                  type: string
     *                                  enum:
     *                                      - TEAPOT_STARTED
     *                                      - TEAPOT_FINISHED
     *                                      - TEAPOT_EMPTIED
     *          responses:
     *              201:
     *                  description: Created
     *              400:
     *                  description: Bad request
     *              401:
     *                  description: Not authorized
     *              404:
     *                  description: Not found
     */
    public addSub = async (req: Request, res: Response) => {
        const attr = req.body as AddSubRequest;
        const teapotId = req.params.teapotId;
        await this.repo.save(teapotId, new LoggingTeapotSubscription(v4(), attr.eventType as TeapotEventType));
        return res.status(201).send();
    }

    /**
     * @swagger
     * /v1/devices/teapots/{id}/start:
     *      post:
     *          summary: Start a teapot
     *          tags: [Teapots]
     *          parameters:
     *              - name: id
     *                in: path
     *                description: Teapot id
     *                required: true
     *                schema:
     *                  type: string
     *                  format: uuid
     *          responses:
     *              200:
     *                  description: Ok
     *              400:
     *                  description: Bad request
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  message:
     *                                      type: string
     *              401:
     *                  description: Not authorized
     *              403:
     *                  description: Forbidden
     *              404:
     *                  description: Not found
     *
     */
    public start = async (req: Request, res: Response) => {
        const id = req.params.teapotId;
        let teapotModel = await this.repository.findByPk(id, {include: {all: true}}).then(m => m?.reload());
        if (!teapotModel) {
            return res.status(404).send();
        }
        teapotModel = teapotModel as TeapotModel;
        const subs = await sequelize.getRepository(TeapotSubscriptionModel).findAll({
            where: {
                teapotId: teapotModel.id
            },
            include: {all: true}
        });

        const subMapper = new EventSubscriptionMapper();

        const mappedSubs = subs.map(s => subMapper.toEntity(s.subscription));

        const teapot = new Teapot(
            teapotModel.id,
            teapotModel.name,
            // @ts-ignore
            new Profile(teapotModel.profileId, "", "", null),
            teapotModel.temperature,
            teapotModel.capacity,
            teapotModel.waterSupply,
            teapotModel.state,
            mappedSubs
        );

        teapot.start();

        await teapotModel.update(teapot);
        return res.status(200).send();
    }

    /**
     * @swagger
     * /v1/devices/teapots:
     *      get:
     *          summary: Find all teapots by profile id
     *          tags: [Teapots]
     *          parameters:
     *              - name: profileId
     *                in: query
     *                description: Profile id
     *                required: true
     *                schema:
     *                  type: string
     *                  format: uuid
     *          responses:
     *              200:
     *                  description: Ok
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#components/schemas/TeapotResponse'
     *
     *
     */
    public findAllByProfileId = async (req: Request, res: Response) => {
        const profileId: string = req.query.profileId as string;

        const models = await this.repository.findAll({
            where:
                {
                    profileId: profileId
                }
        });

        const result = models.map(async m => {
            const subs = await this.repo.findAllByTeapotId(m.id);

            const result = {
                ...m.dataValues,
                subscriptions: subs.map(mapSubs)
            }

            delete result.profile;

            return result
        });



        return res.status(200).send(await Promise.all(result));
    }

    /**
     * @swagger
     * /v1/devices/teapots/{id}/state:
     *      put:
     *          summary: Update teapot state
     *          tags: [Teapots]
     *          parameters:
     *              - name: id
     *                in: path
     *                description: Teapot id
     *                required: true
     *                schema:
     *                  type: string
     *                  format: uuid
     *          requestBody:
     *              required: true
     *              description: Teapot data values
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          required:
     *                              - temperature
     *                              - waterSupply
     *                          properties:
     *                              temperature:
     *                                  type: number
     *                              waterSupply:
     *                                  type: number
     *          responses:
     *              200:
     *                  description: Updated
     *              400:
     *                  description: Bad request
     *              401:
     *                  description: Not authorized
     *              403:
     *                  description: Forbidden
     *              404:
     *                  description: Not found
     */
    public updateState = async (req: Request, res: Response) => {
        const teapotId = req.params['teapotId'];
        const values = req.body as UpdateStateRequest;

        const teapotModel = await this.repository.findByPk(teapotId);
        if (!teapotModel) {
            return res.status(404).send();
        }

        const subMapper = new EventSubscriptionMapper();
        const subs = await this.repo.findAllByTeapotId(teapotId);

        const mappedSubs = subs.map(subMapper.toEntity);

        const teapot = new Teapot(
            teapotModel.id,
            teapotModel.name,
            // @ts-ignore
            new Profile(teapotModel.profileId, "", "", null),
            teapotModel.temperature,
            teapotModel.capacity,
            teapotModel.waterSupply,
            teapotModel.state,
            mappedSubs
        );

        teapot.updateState(values.temperature, values.waterSupply);

        await teapotModel.update(teapot);
        return res.status(200).send();

    }
}

const mapSubs = (s: EventSubscriptionModel): TeapotSubscription => {
    return {
        id: s.id,
        eventType: s.eventType,
        handlerType: s.discriminatorValue
    }
}

type AddSubRequest = {
    eventType: string,
}

type UpdateStateRequest = {
    temperature: number
    waterSupply: number
}