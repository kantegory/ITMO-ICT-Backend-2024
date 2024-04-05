import { Sequelize } from 'sequelize-typescript'
import { Curator, Jury, Roles, TeamLead, User } from '../models/user';
import { Participient, Team } from '../models/team';
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

const models = [User, Jury, Curator, Roles, TeamLead, Task, Team, File, Link, Participient, Solution, Grading];
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