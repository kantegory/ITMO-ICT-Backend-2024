"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("../models/user/User"));
const City_1 = __importDefault(require("../models/city/City"));
const HotelComment_1 = __importDefault(require("../models/comment/HotelComment"));
const PlaceComment_1 = __importDefault(require("../models/comment/PlaceComment"));
const UserComment_1 = __importDefault(require("../models/comment/UserComment"));
const Country_1 = __importDefault(require("../models/country/Country"));
const Hotel_1 = __importDefault(require("../models/hotel/Hotel"));
const TravelUserLink_1 = __importDefault(require("../models/links/TravelUserLink"));
const Place_1 = __importDefault(require("../models/place/Place"));
const Transport_1 = __importDefault(require("../models/transport/Transport"));
const Travel_1 = __importDefault(require("../models/travel/Travel"));
const UserInfo_1 = __importDefault(require("../models/userInfo/UserInfo"));
const sequelize = new sequelize_typescript_1.Sequelize({
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const models = [
    User_1.default,
    City_1.default,
    HotelComment_1.default,
    PlaceComment_1.default,
    UserComment_1.default,
    Country_1.default,
    Hotel_1.default,
    TravelUserLink_1.default,
    Place_1.default,
    Transport_1.default,
    Travel_1.default,
    UserInfo_1.default
];
sequelize.addModels(models);
sequelize.sync().then(() => console.log("models are synced")).catch((error) => console.log(error));
// TODO: add auth
exports.default = sequelize;
