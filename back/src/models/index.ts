import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, QueryTypes, Deferrable } from "sequelize";

import { User } from "./User.model";
import { Neck } from "./Neck.model";
import { Body } from "./Body.model";
import { Code } from "./Code.model";

const db: any = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Model = Model;
db.DataTypes = DataTypes;
db.QueryTypes = QueryTypes;
db.Deferrable = Deferrable;

db.User = User;
db.User = Neck;
db.User = Body;
db.User = Code;

// User.init(sequelize);

// User.associate(db);

export { db };
