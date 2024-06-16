import { Sequelize } from 'sequelize-typescript';
import User from './models/users/User'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  host: 'localhost',
  port: 3000,
  username: 'username',
  password: '',
  database: 'dev_database'
});

sequelize.addModels([User]);

sequelize.sync()

export default sequelize;