import BaseRepository from "../BaseRepository";
import {Profile} from "../../../domain/profile";
import {ProfileModel} from "./index";
import sequelize from "../db";
import {ProfileMapper} from "./mapper";
import {AccountModel} from "../account";

export class ProfileRepository extends BaseRepository<string, Profile, ProfileModel> {
    public constructor() {
        super(sequelize.getRepository(ProfileModel), new ProfileMapper());
    }

    public async save(entity: Profile): Promise<Profile> {
        const attributes = {
            id: entity.id,
            name: entity.name,
            location: entity.location,
            userId: entity.user.id
        };

        const model = await this.repository.create(attributes, {
            include: [{all: true}]
        }).then(e => e.reload());

        return Promise.resolve(this.mapper.toEntity(model));
    }
}