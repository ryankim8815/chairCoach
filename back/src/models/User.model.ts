const { Sequelize, Model, DataTypes, Deferrable } = require("sequelize");
import sequelize from "../config/sequelize";
import { db } from "./index";

class User extends Model {
  // Models
  static async findAll() {
    db.sequelize.query(
      `
    SELECT email, nickname, created_at  
    FROM users
    `,
      {
        type: db.QueryTypes.SELECT,
      }
    );
  }
  static async countAll() {
    db.sequelize.query(
      `
        SELECT count(user_id) AS cnt 
        FROM users
      `,
      {
        type: db.QueryTypes.SELECT,
      }
    );
  }

  static async findByUserId({ user_id }) {
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
  }

  static async findByEmail({ email }) {
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
  }

  static async findByNickname({ nickname }) {
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
  }

  static async create({
    user_id,
    email,
    password,
    nickname,
    provider,
    created_at,
  }) {
    db.sequelize.query(
      `
        INSERT INTO users (user_id, email, password, nickname, provider, created_at) VALUES (?, ?, ?, ?, ?, ?)
              `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [
          user_id,
          email,
          password,
          nickname,
          provider,
          created_at,
        ],
      }
    );
  }

  static async update({ user_id, password, nickname }) {
    db.sequelize.query(
      `
        UPDATE users SET password = ?, nickname = ? 
        WHERE user_id = ?
              `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [password, nickname, user_id],
      }
    );
  }

  static async updateAlert({ user_id, alert, timer }) {
    db.sequelize.query(
      `
        UPDATE users SET alert = ?, timer = ? 
        WHERE user_id = ?
                `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [alert, timer, user_id],
      }
    );
  }

  static async withdraw({ user_id }) {
    db.sequelize.query(
      `
        UPDATE users SET withdraw_at = NOW(), status = pending WHERE user_id = ?
                  `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id],
      }
    );
  }

  static async undoWithdraw({ user_id }) {
    db.sequelize.query(
      `
        UPDATE users SET withdraw_at = null, status = null 
        WHERE user_id = ?
                    `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id],
      }
    );
  }

  static async delete({ user_id }) {
    db.sequelize.query(
      `
        DELETE FROM users 
        WHERE user_id = ?
                      `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [user_id],
      }
    );
  }
}
// Schemas
User.init(
  {
    user_id: {
      // type: DataTypes.CHAR(36),   // mysql for UUID
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // auto generator
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(12), // 한글+숫자 2~8 | 영어+숫자 2~12
      unique: true,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    withdraw_at: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    alert: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    timer: {
      type: DataTypes.INTEGER,
      defaultValue: "0",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
    charset: "utf8mb4",
    paranoid: true, // soft deletion
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    // indexes: [{ unique: true, fields: ["someUnique"] }], // field를 정의하면 getter setter 활용가능
  }
);

// console.log(User.classLevelMethod()); // 'foo'
// const user = User.build({ firstname: "Jane", lastname: "Doe" });
// console.log(user.instanceLevelMethod()); // 'bar'
// console.log(user.getFullname()); // 'Jane Doe'

export { User };
