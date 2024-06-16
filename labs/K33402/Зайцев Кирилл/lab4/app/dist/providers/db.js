import { Sequelize } from 'sequelize-typescript';
import { PoolCard } from '../models/pool_cards/index.js';
const sequelize = new Sequelize({
    database: 'some_db',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite',
    logging: console.log,
});
const models = [PoolCard];
sequelize.addModels(models);
sequelize
    .sync()
    .then(() => {
    //something here
    console.log('synced models');
})
    .catch((e) => console.log(e));
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();
export default sequelize;
//# sourceMappingURL=db.js.map