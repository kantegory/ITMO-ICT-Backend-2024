import {Factory} from "../../factory";
import {Teapot} from "./index";
import {TeapotCreateAttributes, TeapotRestoreAttributes} from "./attributes";


export default class TeapotFactory extends Factory<Teapot, TeapotCreateAttributes, TeapotRestoreAttributes> {
    public create(attributes: TeapotCreateAttributes): Teapot {
        return new Teapot(this.generateId(), attributes.name, attributes.profile, attributes.temperature, attributes.capacity, attributes.waterSupply);
    }

    public restore(attributes: TeapotRestoreAttributes): Teapot {
        return this.create(attributes as TeapotCreateAttributes);
    }

}