import UserProfile from "./userProfile"
import Tour from "./tour"
import ComfortLevel from "./dictionaries/comfortLevel"
import DifficultyLevel from "./dictionaries/difficultyLevel"
import Place from "./dictionaries/place"
import TourActivity from "./dictionaries/tourActivity"
import TourType from "./dictionaries/tourType"
import User from './user'
import { ModelCtor } from "sequelize-typescript";
import BaseDictionary from "./dictionaries/base";

const models: Array<ModelCtor> = [
    User,
    UserProfile,
    Tour,

    ComfortLevel,
    DifficultyLevel,
    Place,
    TourActivity,
    TourType,
]

export default models

export {
    User,
    UserProfile,
    Tour,

    BaseDictionary,
    ComfortLevel,
    DifficultyLevel,
    Place,
    TourActivity,
    TourType,
}