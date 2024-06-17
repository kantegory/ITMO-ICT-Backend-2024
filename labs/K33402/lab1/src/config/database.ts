import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Mysql', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

export { sequelize };
