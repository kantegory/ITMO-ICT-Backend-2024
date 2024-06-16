import { Sequelize } from 'sequelize-typescript'
import Article from '../models/articles/Article'
import Comment from '../models/comments/Comment'
import Favorite from '../models/favorites/Favorite'
import Like from '../models/likes/Like'
import Specialization from '../models/specializations/Specialization'
import 'dotenv/config';


const sequelize = new Sequelize({
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "postgres"
})
const models = [Article, Favorite, Like, Specialization, Comment,]
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