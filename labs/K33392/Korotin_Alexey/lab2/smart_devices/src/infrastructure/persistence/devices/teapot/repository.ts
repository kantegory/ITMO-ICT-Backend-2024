import BaseRepository from "../../BaseRepository";
import {Teapot} from "../../../../domain/devices/teapot";
import {TeapotModel} from "./index";
import sequelize from "../../db";
import {TeapotMapper} from "./mapper";
import {ProfileModel} from "../../profile";
import {TeapotSubscriptionModel} from "./subscription/TeapotSubscription";


export class TeapotRepository extends BaseRepository<string, Teapot, TeapotModel> {
    public constructor() {
        super(sequelize.getRepository(TeapotModel), new TeapotMapper());

    }

    public async save(entity: Teapot): Promise<Teapot> {
        const model = await this.mapper.toModel(entity).save();
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