import { Sequelize } from 'sequelize-typescript'
import Bear from '../models/Bear'

const sequelize = new Sequelize({
  database: 'lab1_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite',
  logging: console.log,
});

const models = [Bear]

sequelize.addModels(models)

sequelize.sync().then(() => {
    console.log('synced models')
}).catch((e) => console.log(e))

async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnection()

export default sequelize