import {Mapper} from "../../mapper";
import {Teapot} from "../../../../domain/devices/teapot";
import {TeapotModel} from "./index";
import {EventSubscriptionMapper} from "../../event_subscriptions/mapper";
import {ProfileMapper} from "../../profile/mapper";

export class TeapotMapper implements Mapper<Teapot, TeapotModel> {
    private readonly subMapper: EventSubscriptionMapper = new EventSubscriptionMapper();
    private readonly profileMapper: ProfileMapper = new ProfileMapper();

    public toEntity(model: TeapotModel): Teapot {
        const subMapper = this.subMapper;
        return new Teapot(
            model.id,
            model.name,
            this.profileMapper.toModel(model.profile),
            model.temperature,
            model.capacity,
            model.waterSupply,
            model.state,
            model.subscriptions.map((m) => subMapper.toEntity(m.subscription))
        );
    }

    public toModel(entity: Teapot): TeapotModel {
        return new TeapotModel({
            id: entity.id,
            name: entity.name,
            profileId: entity.linkedProfile.id,
            temperature: entity.temperature,
            capacity: entity.capacity,
            waterSupply: entity.waterSupply,
            state: entity.state
        });
    }

}