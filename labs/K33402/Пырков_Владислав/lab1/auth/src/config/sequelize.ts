import dotenv from 'dotenv'

import { Sequelize } from 'sequelize-typescript'

import Profile from '../models/Profile'
import User from '../models/User'

dotenv.config()
const sequelize = new Sequelize({
	database: 'postgres',
	username: 'postgres',
	password: 'toraha01',
	dialect: 'postgres',
	storage: 'db.postgres',
	host: process.env.DB_HOST || 'localhost',
	port: 5432,
	repositoryMode: true,
	logging: console.log,
})

sequelize.addModels([User, Profile])

sequelize.sync().then(() => {
	console.log('sync sequelize')
})

async function testConnection() {
	try {
		await sequelize.authenticate()
		console.log('connected')
	} catch (e) {
		console.log('Did not connected because of error: ', e)
	}
}

testConnection()

export default sequelize
