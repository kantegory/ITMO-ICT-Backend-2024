"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const settings_1 = require("./settings");
const unicorns_1 = require("../models/unicorns");
const sequelize = new sequelize_typescript_1.Sequelize(settings_1.settings);
const models = [unicorns_1.Unicorn];
sequelize.addModels(models);
sequelize
    .sync()
    .then(() => {
    console.log("synced models");
})
    .catch((e) => console.log(e));
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
testConnection();
exports.default = sequelize;
//# sourceMappingURL=db.js.map