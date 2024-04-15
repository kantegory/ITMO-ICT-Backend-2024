import { Sequelize } from 'sequelize-typescript'
import Jury, { Curator, User } from '../model/user';
import { Participant, Team } from '../model/team';
import { Grading, Solution } from '../model/solution';
import { File, Link, Hackathon } from '../model/task';

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

const models = [User, Jury, Curator, Hackathon, Team, File, Link, Solution, Grading];
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