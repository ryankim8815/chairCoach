import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import { db } from "./";

// class User extends Model {
class User {
  // Models
  static findAll = () =>
    db.sequelize.query(
      `
    SELECT email, nickname, created_at
    FROM users
    `,
      {
        type: db.QueryTypes.SELECT,
      }
    );

  static countAll = () =>
    db.sequelize.query(
      `
      SELECT COUNT(user_id) AS cnt
      FROM users
      `,
      {
        type: db.QueryTypes.SELECT,
      }
    );

  static findByUserId = ({ user_id }) =>
    db.sequelize.query(
      `
        SELECT user_id, password, email, nickname, provider, created_at, withdraw_at, status, alert, timer
        FROM users
        WHERE user_id = ?
        `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id],
      }
    );

  static findByEmail = ({ email }) =>
    db.sequelize.query(
      `
        SELECT * FROM users
        WHERE email = ?
          `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [email],
      }
    );

  static findByNickname = ({ nickname }) =>
    db.sequelize.query(
      `
      SELECT * FROM users
      WHERE nickname = ?
      `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [nickname],
      }
    );

  static create = ({
    user_id,
    email,
    password,
    nickname,
    provider,
    transaction,
  }) =>
    db.sequelize.query(
      `
        INSERT INTO users (user_id, email, password, nickname, provider) VALUES (?, ?, ?, ?, ?)
              `,
      {
        type: db.QueryTypes.INSERT,
        replacements: [user_id, email, password, nickname, provider],
        transaction: transaction,
      }
    );

  static update = ({ user_id, password, nickname }) =>
    db.sequelize.query(
      `
        UPDATE users SET password = ?, nickname = ?
        WHERE user_id = ?
              `,
      {
        type: db.QueryTypes.UPDATE,
        replacements: [password, nickname, user_id],
      }
    );

  static updateNickname = ({ user_id, provider, nickname }) =>
    db.sequelize.query(
      `
        UPDATE users SET nickname = ?
        WHERE user_id = ? AND provider = ?
              `,
      {
        type: db.QueryTypes.UPDATE,
        replacements: [nickname, user_id, provider],
      }
    );

  static updateAlert = ({ user_id, alert, timer }) =>
    db.sequelize.query(
      `
        UPDATE users SET alert = ?, timer = ?
        WHERE user_id = ?
                `,
      {
        type: db.QueryTypes.UPDATE,
        replacements: [alert, timer, user_id],
      }
    );

  static withdraw = ({ user_id }) =>
    db.sequelize.query(
      `
        UPDATE users SET withdraw_at = NOW(), status = 'pending' WHERE user_id = ?
                  `,
      {
        type: db.QueryTypes.UPDATE,
        replacements: [user_id],
      }
    );

  static undoWithdraw = ({ user_id }) =>
    db.sequelize.query(
      `
        UPDATE users SET withdraw_at = null, status = null
        WHERE user_id = ?
                    `,
      {
        type: db.QueryTypes.UPDATE,
        replacements: [user_id],
      }
    );

  static delete = ({ user_id }) =>
    db.sequelize.query(
      `
        DELETE FROM users
        WHERE user_id = ?
                      `,
      {
        type: db.QueryTypes.DELETE,
        replacements: [user_id],
      }
    );
}

export = User;
