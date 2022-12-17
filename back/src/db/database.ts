import mysql from "mysql2";
import "dotenv/config";

const dbConfig = {
  host: process.env.MySQL_DB_HOST,
  user: process.env.MySQL_DB_USER,
  password: process.env.MySQL_DB_PASSWORD,
  database: process.env.MySQL_DB_DATABASE,
  connectionLimit: 10,
  queueLimit: 0, // unlimited
};
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

export = promisePool;
