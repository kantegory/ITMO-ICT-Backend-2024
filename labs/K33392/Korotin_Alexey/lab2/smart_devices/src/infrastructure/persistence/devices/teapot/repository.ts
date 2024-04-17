import BaseRepository from "../../BaseRepository";
import {Teapot} from "../../../../domain/devices/teapot";
import {TeapotModel} from "./index";
import sequelize from "../../db";
import {TeapotMapper} from "./mapper";
import {ProfileModel} from "../../profile";
import {TeapotSubscriptionModel} from "./subscription/TeapotSubscription";
import {ProfileRepository} from "../../profile/repository";
import {ProfileMapper} from "../../profile/mapper";


export class TeapotRepository extends BaseRepository<string, Teapot, TeapotModel> {
    private readonly profileRepo: ProfileRepository = new ProfileRepository();

    public constructor() {
        super(sequelize.getRepository(TeapotModel), new TeapotMapper());

    }

    public async save(entity: Teapot): Promise<Teapot> {
        const attributes = {
            id: entity.id,
            name: entity.name,
            profileId: entity.linkedProfile.id,
            temperature: entity.temperature,
            capacity: entity.capacity,
            waterSupply: entity.waterSupply,
            state: entity.state

        }
        const model = await this.repository.create(attributes)
            .then(m => m.reload());

        model.profile = new ProfileMapper().toModel(await this.profileRepo.findById(model.profileId));
        return Promise.resolve(this.mapper.toEntity(model));
    }


    async findById(id: string): Promise<Teapot> {
        const model = await this.repository.findByPk(id, {
            include: [{
                model: sequelize.models.ProfileModel,
                required: true
            },
                {
                    model: sequelize.models.TeapotSubscriptionModel,
                    required: true
                }
            ]
        });

        if (!model) {
            return Promise.reject({message: "Not found"});
        }

        return Promise.resolve(this.mapper.toEntity(model));
    }
}