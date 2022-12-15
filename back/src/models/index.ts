import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, QueryTypes, Deferrable } from "sequelize";

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

const db: any = {};
// Code.init(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Model = Model;
db.DataTypes = DataTypes;
db.QueryTypes = QueryTypes;
db.Deferrable = Deferrable;

db.User = require("./User.schema")(sequelize, db);
db.Neck = require("./Neck.schema")(sequelize, db);
db.Code = require("./Code.schema")(sequelize, db);
db.Body = require("./Body.schema")(sequelize, db);
db.Token = require("./Token.schema")(sequelize, db);
// db.User = Neck;
// db.User = Body;
// db.User = Code;

// User;
// User.associate(db);

export { db };
