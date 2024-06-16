import { Sequelize } from 'sequelize-typescript';
import { User } from './User';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'bookstore',
    models: [User],
});

export { sequelize };
