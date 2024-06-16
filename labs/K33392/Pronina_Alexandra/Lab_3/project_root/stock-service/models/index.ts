import { Sequelize } from 'sequelize-typescript';
import { Stock } from './Stock';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'bookstore',
    models: [Stock],
});

export { sequelize };
