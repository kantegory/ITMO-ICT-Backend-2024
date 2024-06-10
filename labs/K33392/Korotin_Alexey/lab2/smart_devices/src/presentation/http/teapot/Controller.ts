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

export class TeapotController {
    public constructor(private readonly repo: TeapotSubscriptionRepository) {
    }

    public post = async (req: Request, res: Response) => {
        const attributes: TeapotCreateAttributes = {
            ...req.body,
            profile: new Profile(req.body.profileId,"", "", res.locals.user)
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

        const model = await teapotRepo.create(createAttributes, {include: ['subscriptions']})
            .then(m => m.reload());

        return res.status(201).json(model);
    }

    public get = async (req: Request, res: Response) => {
        const id = req.params.teapotId;
        const teapotRepo = sequelize.getRepository(TeapotModel);
        const teapot = await teapotRepo.findByPk(id, {include: {all: true}}).then(m => m?.reload());
        return res.status(200).json(teapot);
    }

    public addSub = async (req: Request, res: Response) => {
        const attr = req.body as AddSubRequest;
        const teapotId = req.params.teapotId;
        await this.repo.save(teapotId, new LoggingTeapotSubscription(v4(), attr.eventType as TeapotEventType));
        return res.status(201).send();
    }

    public start = async (req: Request, res: Response) => {
        const id = req.params.teapotId;
        const teapotRepo = sequelize.getRepository(TeapotModel);
        let teapotModel = await teapotRepo.findByPk(id, {include: {all: true}}).then(m => m?.reload());
        if (!teapotModel) {
            return res.status(404).send();
        }
        teapotModel = teapotModel as TeapotModel;
        const subs = await sequelize.getRepository(TeapotSubscriptionModel).findAll({where: {
                teapotId: teapotModel.id
            },
        include: {all: true}});

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
        return res.status(200).send();
    }
}

type AddSubRequest = {
    eventType: string,
}