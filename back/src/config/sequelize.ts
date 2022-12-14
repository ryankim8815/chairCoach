import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";

const host = process.env.SEQUELIZE_DB_HOST;
const username = process.env.SEQUELIZE_DB_USER;
const password = process.env.SEQUELIZE_DB_PASSWORD;
const database = process.env.SEQUELIZE_DB_DATABASE;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  logging: true,
  timezone: "+09:00",
  dialectOptions: {
    charset: "utf8mb4",
    timestamps: false, // true: createAt, updateAt
    dateStrings: true,
    typeCast: true,
  },
});

export default sequelize;
