import { Dialect } from 'sequelize'
import {
    initDb,
    User,
    UserProfile,
    Tour,

    ComfortLevel,
    DifficultyLevel,
    Place,
    TourActivity,
    TourType,
} from 'shared-database'
import {ModelCtor} from "sequelize-typescript";

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

const initSeq = async () => {
    const dbModels = await initDb({
        database: process.env.DB_DATABASE,
        dialect: process.env.DB_DIALECT as Dialect,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        storage: process.env.DB_STORAGE,
    }, models)
}

export {initSeq}
export {models}
export {
    User,
    UserProfile,
    Tour,

    ComfortLevel,
    DifficultyLevel,
    Place,
    TourActivity,
    TourType,
}