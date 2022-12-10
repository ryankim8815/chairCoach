const { Sequelize, Model, DataTypes, Deferrable } = require("sequelize");
import sequelize from "../config/sequelize";
// import { User } from "./User.model";
import { db } from "./index";

class Neck extends Model {
  // Models
  // 전체 기록 조회
  static async findAll() {
    db.sequelize.query(
      `
        SELECT * 
        FROM necks
          `,
      {
        type: db.QueryTypes.SELECT,
      }
    );
  }

  // 전체 기록 개수 조회
  static async countAll() {
    db.sequelize.query(
      `
        SELECT count(neck_id) AS cnt 
        FROM necks
            `,
      {
        type: db.QueryTypes.SELECT,
      }
    );
  }

  // 특정 유저의 기록 조회
  static async findByUserId({ user_id }) {
    db.sequelize.query(
      `
        SELECT * FROM necks 
        WHERE user_id = ?
          `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id],
      }
    );
  }

  // 특정 유저의 기록 개수 조회
  static async countByUserId({ user_id }) {
    db.sequelize.query(
      `
        SELECT count(neck_id) AS cnt 
        FROM necks WHERE user_id = ?
            `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id],
      }
    );
  }

  // 기록 등록
  static async create({
    neck_id,
    user_id,
    result,
    score,
    filename,
    created_at,
  }) {
    db.sequelize.query(
      `
        INSERT INTO necks (neck_id, user_id, result, score, filename, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)
              `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [neck_id, user_id, result, score, filename, created_at],
      }
    );
  }

  // 특정 유저의 기록 조회 - year
  static async findByUserIdYear({ user_id, year }) {
    db.sequelize.query(
      `
        SELECT DATE_FORMAT(created_at, %Y-%m) AS month, COUNT(user_id) AS count, AVG(score) AS avg 
        FROM necks 
        WHERE NOT score IS NULL 
        AND user_id = ? 
        AND DATE_FORMAT(created_at, %Y) = ? 
        GROUP BY DATE_FORMAT(created_at, %Y-%m)
              `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id, year],
      }
    );
  }
}
// Schemas
Neck.init(
  {
    neck_id: {
      type: db.DataTypes.UUID,
      defaultValue: db.DataTypes.UUIDV4, // auto generator
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: db.DataTypes.UUID,
      defaultValue: db.DataTypes.UUIDV4, // auto generator
      unique: true,
      //   primaryKey: true,
      allowNull: false,
      references: {
        model: db.User,
        key: "user_id",
      },
    },
    filename: {
      type: db.DataTypes.STRING(255),
      allowNull: false,
    },
    result: {
      type: db.DataTypes.FLOAT(360), // 각도는 최대 360도 - 적절한지 확인 필요
      allowNull: false,
    },
    score: {
      type: db.DataTypes.INTEGER,
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
    modelName: "neck",
    timestamps: true,
    // charset: "utf8mb4",
    paranoid: true, // soft deletion
  }
);

export { Neck };
