import { Sequelize } from 'sequelize-typescript';
import { Book } from './Book';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'bookstore',
    models: [Book],
});

export { sequelize };
