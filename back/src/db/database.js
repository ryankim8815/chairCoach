"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mysql2_1 = __importDefault(require("mysql2"));
require("dotenv/config");
var dbConfig = {
    host: process.env.MySQL_DB_HOST,
    user: process.env.MySQL_DB_USER,
    password: process.env.MySQL_DB_PASSWORD,
    database: process.env.MySQL_DB_DATABASE,
    connectionLimit: 10,
    queueLimit: 0, // unlimited
};
var pool = mysql2_1.default.createPool(dbConfig);
var promisePool = pool.promise();
module.exports = promisePool;
