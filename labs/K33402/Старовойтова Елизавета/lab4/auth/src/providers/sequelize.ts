import { Dialect } from 'sequelize'
import {
    User,
    UserProfile,
    Tour,

    ComfortLevel,
    DifficultyLevel,
    Place,
    TourActivity,
    TourType,
} from 'shared-database'
import { ModelCtor, Sequelize } from "sequelize-typescript";
import dbConfig from "../config/db";

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


const sequelize = new Sequelize({
    database: dbConfig.database,
    dialect: dbConfig.dialect as Dialect,
    username: dbConfig.username,
    password: dbConfig.password,
    storage: dbConfig.storage,
    host: dbConfig.host,
    port: dbConfig.port,
    logging: console.log,
})

const initSeq = async () => {
    sequelize.addModels(models)
    await sequelize.authenticate()
}

export { initSeq }
export { sequelize }
export { models }
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