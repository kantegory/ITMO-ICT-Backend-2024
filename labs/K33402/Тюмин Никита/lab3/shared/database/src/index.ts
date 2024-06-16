import {ModelCtor, Sequelize} from 'sequelize-typescript'
import { Dialect } from 'sequelize'
import models, {BaseDictionary, ComfortLevel, DifficultyLevel, Place, Tour, TourActivity, TourType, User, UserProfile} from "./models";

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

export interface ConnectionParams {
    database: string|undefined
    dialect: Dialect
    username: string|undefined
    password: string|undefined
    storage: string|undefined
}

export interface DBModels {
    sequelize: Sequelize,
    models: any
}

const initDb = async (
    params: ConnectionParams,
    customModels: Array<ModelCtor>|null = null
): Promise<DBModels> => {
    const sequelize = new Sequelize({
        database: params.database,
        dialect: params.dialect,
        username: params.username,
        password: params.password,
        storage: params.storage,
        logging: console.log,
    })

    sequelize.addModels(customModels === null ? models : customModels)
    await sequelize.authenticate();

    return {
        sequelize: sequelize,
        models: {
            User,
            UserProfile,
            Tour,

            ComfortLevel,
            DifficultyLevel,
            Place,
            TourActivity,
            TourType,
        },
    };
}

export { initDb }

