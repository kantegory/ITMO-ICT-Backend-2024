import {Profile} from "../../profile";

export type TeapotCreateAttributes = {
    name: string,
    profile: Profile
    temperature: number,
    capacity: number,
    waterSupply: number,
}

export type TeapotRestoreAttributes = {

}