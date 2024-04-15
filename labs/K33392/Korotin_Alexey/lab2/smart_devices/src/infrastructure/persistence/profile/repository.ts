import BaseRepository from "../BaseRepository";
import {Profile} from "../../../domain/profile";
import {ProfileModel} from "./index";

export class ProfileRepository extends BaseRepository<string, Profile, ProfileModel> {

    public async save(entity: Profile): Promise<Profile> {
        const attributes = {
            id: entity.id,
            name: entity.name,
            location: entity.location,
            userId: entity.user.id
        };

        const model = await this.repository.create(attributes);

        return Promise.resolve(this.mapper.toEntity(model));
    }
}