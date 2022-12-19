"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
require("dotenv/config");
var host = process.env.SEQUELIZE_DB_HOST;
var username = process.env.SEQUELIZE_DB_USER;
var password = process.env.SEQUELIZE_DB_PASSWORD;
var database = process.env.SEQUELIZE_DB_DATABASE;
var sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: "mysql",
    logging: true,
    timezone: "+09:00",
    dialectOptions: {
        charset: "utf8mb4",
        timestamps: false,
        dateStrings: true,
        typeCast: true,
    },
});
exports.default = sequelize;
