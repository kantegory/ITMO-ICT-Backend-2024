import { Sequelize } from 'sequelize-typescript'
import Jury, { Curator, User } from '../models/user';
import { Participant, Team } from '../models/team';
import { Grading, Solution } from '../models/solution';
import { File, Link, Task } from '../models/task';

const sequelize = new Sequelize({
    database: process.env.database,
    dialect: "sqlite",
    host: process.env.host,
    username: process.env.username,
    password: process.env.password,
    storage: process.env.storage, 
    logging: console.log,
    repositoryMode: true
});

const models = [User, Jury, Curator, Task, Team, File, Link, Solution, Grading];
sequelize.addModels(models);

sequelize
  .sync()
  .then(() => {
     console.log('Models synced successfully');
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

testConnection();

export default sequelize;