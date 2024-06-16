import { Sequelize } from 'sequelize-typescript'

import User from '../models/users/user'
import RefreshToken from "../models/auth/RefreshToken"
import Location from "../models/locations/location"
import {Activity, UserActivity,LocationActivity} from '../models/activities/activity'
import {Offer} from '../models/offers/offer'
import {Trip, TripLocation} from '../models/trips/trip'
import {Review} from "../models/reviews/review"
require('dotenv').config();

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "sqlite"
})

const models = [
    User, 
    RefreshToken, 
    Activity, 
    UserActivity, 
    Location, 
    LocationActivity, 
    Offer, 
    Trip, 
    TripLocation, 
    Review
]

sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     console.log('synced models')
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

testConnection()

export default sequelize