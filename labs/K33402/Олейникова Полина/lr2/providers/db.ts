import { Sequelize } from 'sequelize-typescript'
import User from '../models/users/User'
import Article from '../models/articles/Article'
import Comment from '../models/comments/Comment'
import Favorite from '../models/favorites/Favorite'
import Like from '../models/likes/Like'
import Specialization from '../models/specializations/Specialization'
import { RefreshToken } from "../models/auth/RefreshToken"
import 'dotenv/config';


const sequelize = new Sequelize({
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "postgres"
})
const models = [User, RefreshToken, Article, Favorite, Like, Specialization, Comment,]
sequelize.addModels(models)

// sequelize
//     .sync()
//     .then(() => {
//         console.log('synced models')
//     })
//     .catch((e) => console.log(e));

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