import {Sequelize} from "sequelize-typescript"
import User from "../models/user/User"
import City from "../models/city/City";
import HotelComment from "../models/comment/HotelComment";
import PlaceComment from "../models/comment/PlaceComment";
import UserComment from "../models/comment/UserComment";
import Country from "../models/country/Country";
import Hotel from "../models/hotel/Hotel";
import TravelUserLink from "../models/links/TravelUserLink";
import Place from "../models/place/Place";
import Transport from "../models/transport/Transport";
import Travel from "../models/travel/Travel";
import UserInfo from "../models/userInfo/UserInfo";

const sequelize = new Sequelize({
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: 'sqlite',
    storage: 'database.sqlite'
})

const models = [
    User,
    City,
    HotelComment,
    PlaceComment,
    UserComment,
    Country,
    Hotel,
    TravelUserLink,
    Place,
    Transport,
    Travel,
    UserInfo
]

sequelize.addModels(models)
sequelize.sync().then(() => console.log("models are synced")).catch((error) => console.log(error))

// TODO: add auth

export default sequelize