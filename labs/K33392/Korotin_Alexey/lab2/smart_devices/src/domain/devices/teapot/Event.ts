import {DomainEvent} from "../../Events";
import {Teapot} from "./index";

export class TeapotEvent implements DomainEvent<Teapot> {
    public constructor(public entity: Teapot,
                       public publishTime: Date,
                       public type: string) {
    }
}