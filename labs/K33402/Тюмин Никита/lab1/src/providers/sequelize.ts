import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize'
import models from '../models'

const initSequelize = async () => {
    const sequelize = new Sequelize({
        database: process.env.DB_DATABASE,
        dialect: process.env.DB_DIALECT as Dialect,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        storage: process.env.DB_STORAGE,
        logging: console.log,
    })

    sequelize.addModels(models)

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize
}

export default initSequelize