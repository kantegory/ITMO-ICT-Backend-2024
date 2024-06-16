import { Sequelize } from 'sequelize-typescript'
import User from '../models/users/User'
import { RefreshToken } from "../models/auth/RefreshToken"
import 'dotenv/config';


const sequelize = new Sequelize({
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "postgres"
})
const models = [User, RefreshToken]
sequelize.addModels(models)

async function testConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize