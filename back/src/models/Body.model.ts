const { Sequelize, Model, DataTypes, Deferrable } = require("sequelize");
import sequelize from "../config/sequelize";
// import { User } from "./User.model";
import { db } from "./index";

class Body extends Model {
  // Models
  // 전체 기록 조회
  static async findAll() {
    db.sequelize.query(
      `
          SELECT * 
          FROM bodies
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
        SELECT count(body_id) AS cnt 
        FROM bodies
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
        SELECT * FROM bodies 
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
        SELECT count(body_id) AS cnt 
        FROM bodies 
        WHERE user_id = ?
            `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id],
      }
    );
  }

  // 기록 시작
  static async create({ body_id, user_id, tag, start_time }) {
    db.sequelize.query(
      `
        INSERT INTO bodies (body_id, user_id, tag, start_time) 
        VALUES (?, ?, ?, ?)
              `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [body_id, user_id, tag, start_time],
      }
    );
  }

  // 특정 기록 조회 - 기록 종료 확인용
  static async findByBodyId({ body_id }) {
    db.sequelize.query(
      `
        SELECT start_time, end_time 
        FROM bodies 
        WHERE body_id = ?
              `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [body_id],
      }
    );
  }

  // 기록 종료(sec)
  static async patch({ body_id, end_time }) {
    db.sequelize.query(
      `
        UPDATE bodies 
        SET end_time = ?, duration = TIMESTAMPDIFF(SECOND, start_time, ?) 
        WHERE body_id = ?
              `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [end_time, end_time, body_id],
      }
    );
  }

  // 특정 유저의 기록 조회 - week
  static async findByUserIdWeek({ user_id, year, week }) {
    db.sequelize.query(
      `
        SELECT DATE_FORMAT(start_time, %Y-%m-%d) AS date, tag, COUNT(user_id) AS count, SUM(duration) AS duration 
        FROM bodies 
        WHERE NOT duration IS NULL 
        AND user_id = ? 
        AND DATE_FORMAT(start_time, %Y) = ?
        AND DATE_FORMAT(start_time, %u) = ? 
        GROUP BY tag, DATE_FORMAT(start_time, %Y-%m-%d)
                `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id, year, week],
      }
    );
  }

  // 특정 유저의 기록 조회 - year
  static async findByUserIdYear({ user_id, year }) {
    db.sequelize.query(
      `
        SELECT DATE_FORMAT(start_time, %Y-%m) AS month, tag, COUNT(user_id) AS count, SUM(duration) AS duration 
        FROM bodies 
        WHERE NOT duration IS NULL 
        AND user_id = ? 
        AND DATE_FORMAT(start_time, %Y) = ? 
        GROUP BY tag, DATE_FORMAT(start_time, %Y-%m)
                `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id, year],
      }
    );
  }
}
// Schemas
Body.init(
  {
    body_id: {
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
    tag: {
      type: db.DataTypes.STRING(16), // enum 고려
      allowNull: false,
    },
    start_time: {
      type: "TIMESTAMP",
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    end_time: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    duration: {
      type: db.DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "body",
    timestamps: true,
    charset: "utf8mb4", // tag
    paranoid: true, // soft deletion
  }
);

export { Body };
