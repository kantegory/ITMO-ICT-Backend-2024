import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from './routes/userRoutes';
import dotenv from 'dotenv';
const { Sequelize } = require('sequelize');

// Создание экземпляра Sequelize с использованием SQLite в качестве диалекта
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/config/database.ts'
});
// Загрузка переменных окружения из файла .env
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
