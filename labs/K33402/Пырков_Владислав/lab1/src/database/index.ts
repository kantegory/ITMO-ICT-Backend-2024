import { Sequelize } from 'sequelize-typescript'

import User from './models/User'

const sequelize = new Sequelize({
	database: process.env.DB_NAME || 'database123',
	username: process.env.DB_USER || 'username123',
	password: process.env.DB_PASSWORD || 'password123',
	dialect: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: Number(process.env.DB_PORT || '5432'),
	repositoryMode: true,
	logging: console.log,
})

sequelize.addModels([User])

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
