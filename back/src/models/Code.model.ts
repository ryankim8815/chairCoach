const { Sequelize, Model, DataTypes, Deferrable } = require("sequelize");
import sequelize from "../config/sequelize";
// import { User } from "./User.model";
import { db } from "./index";

class Code extends Model {
  // Models
  static async create({ email, code }) {
    db.sequelize.query(
      `
      REPLACE INTO codes (email, code, created_at) VALUES (?, ?, NOW())
        `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [email, code],
      }
    );
  }

  static async findByEmail({ email }) {
    db.sequelize.query(
      `
      SELECT code FROM codes 
      WHERE email = ?
        `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [email],
      }
    );
  }

  static async delete({ email }) {
    db.sequelize.query(
      `
      DELETE FROM codes 
      WHERE email = ?
        `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [email],
      }
    );
  }
}
// Schemas
Code.init(
  {
    email: {
      type: db.DataTypes.STRING(255),
      unique: true,
      primaryKey: true,
      allowNull: false,
      references: {
        model: db.User,
        key: "email",
      },
    },
    code: {
      type: db.DataTypes.STRING(12), // 숫자 4
      allowNull: false,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "code",
    timestamps: true,
    // charset: "utf8mb4",
    paranoid: false, // true: soft deletion
  }
);

export { Code };
