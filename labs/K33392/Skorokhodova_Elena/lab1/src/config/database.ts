import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:123123@localhost:3000/express');

export { sequelize };