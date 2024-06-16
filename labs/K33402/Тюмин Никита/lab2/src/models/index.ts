import User from './user'
import {ModelCtor} from "sequelize-typescript";
import UserProfile from "./userProfile";
import ComfortLevel from "./dictionaries/comfortLevel";
import DifficultyLevel from "./dictionaries/difficultyLevel";
import Place from "./dictionaries/place";
import TourActivity from "./dictionaries/tourActivity";
import TourType from "./dictionaries/tourType";
import Tour from "./tour";

let models: Array<ModelCtor> = [
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