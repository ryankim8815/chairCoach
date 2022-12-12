const { Sequelize, Model, DataTypes, Deferrable } = require("sequelize");
import sequelize from "../config/sequelize";
// import { User } from "./User.model";
import { db } from "./index";

class Neck {
  // Models
  // 전체 기록 조회
  static findAll = () =>
    db.sequelize.query(
      `
        SELECT * 
        FROM necks
          `,
      {
        type: db.QueryTypes.SELECT,
      }
    );

  // 전체 기록 개수 조회
  static countAll = () =>
    db.sequelize.query(
      `
        SELECT count(neck_id) AS cnt 
        FROM necks
            `,
      {
        type: db.QueryTypes.SELECT,
      }
    );

  // 특정 유저의 기록 조회
  static findByUserId = ({ user_id }) =>
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

  // 특정 유저의 기록 개수 조회
  static countByUserId = ({ user_id }) =>
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

  // 기록 등록
  static create = ({ neck_id, user_id, result, score, filename }) =>
    db.sequelize.query(
      `
        INSERT INTO necks (neck_id, user_id, result, score, filename) 
        VALUES (?, ?, ?, ?, ?)
              `,
      {
        type: db.QueryTypes.INSERT,
        replacements: [neck_id, user_id, result, score, filename],
      }
    );

  // 특정 유저의 기록 조회 - year
  static findByUserIdYear = ({ user_id, year }) =>
    db.sequelize.query(
      `
        SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(user_id) AS count, AVG(score) AS avg 
        FROM necks 
        WHERE NOT score IS NULL 
        AND user_id = ? 
        AND DATE_FORMAT(created_at, '%Y') = ? 
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
              `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id, year],
      }
    );
}

export = Neck;
