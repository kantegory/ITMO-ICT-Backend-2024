import { Sequelize } from 'sequelize-typescript'

import User from '../models/users/user'
import RefreshToken from "../models/auth/RefreshToken"
require('dotenv').config();

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres"
})

const models = [User,RefreshToken]

sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     console.log('synced models')
  })
  .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize