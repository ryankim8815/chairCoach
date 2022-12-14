"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var sequelize_1 = __importDefault(require("../config/sequelize"));
var sequelize_2 = require("sequelize");
// import { User } from "./User.model";
// import { User } from "./User.model";
// import { Neck } from "./Neck.model";
// import { Body } from "./Body.model";
// import { Code } from "./Code.model";
// // init
// function initModels(sequelize, Sequelize, DataTypes) {
//   const user = _user(sequelize, Sequelize, DataTypes);
//   return user;
// }
// initModels(sequelize, Sequelize, DataTypes);
var db = {};
exports.db = db;
// Code.init(sequelize);
db.sequelize = sequelize_1.default;
db.Sequelize = sequelize_2.Sequelize;
db.Model = sequelize_2.Model;
db.DataTypes = sequelize_2.DataTypes;
db.QueryTypes = sequelize_2.QueryTypes;
db.Deferrable = sequelize_2.Deferrable;
db.User = require("./User.schema")(sequelize_1.default, db);
db.Neck = require("./Neck.schema")(sequelize_1.default, db);
db.Code = require("./Code.schema")(sequelize_1.default, db);
db.Body = require("./Body.schema")(sequelize_1.default, db);
