import {Factory} from "../factory";
import {Profile} from "./index";
import {ProfileCreateAttributes, ProfileRestoreAttributes} from "./attributes";


export default class ProfileFactory extends Factory<Profile, ProfileCreateAttributes, ProfileRestoreAttributes> {
    public create(attributes: ProfileCreateAttributes): Profile {
        return new Profile(this.generateId(), attributes.name, attributes.location, attributes.user);
    }

    public restore(attributes: ProfileRestoreAttributes): Profile {
        return new Profile(attributes.id, attributes.name, attributes.location, attributes.user);
    }

}