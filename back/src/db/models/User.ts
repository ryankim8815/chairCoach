import promisePool from "../database";
class User {
  static async findAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT email,nickname,created_at  FROM users",
    });
    return rows;
  }
  static async countAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(user_id) AS cnt FROM users",
    });
    return rows;
  }

  static async findByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT user_id, password, email, nickname, provider, created_at, withdraw_at, status, alert, timer  FROM users WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }

  static async findByEmail({ email }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM users WHERE `email` = ?",
      values: [email],
    });
    return rows;
  }

  static async findByNickname({ nickname }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM users WHERE `nickname` = ?",
      values: [nickname],
    });
    return rows;
  }

  static async create({
    user_id,
    email,
    password,
    nickname,
    provider,
    created_at,
  }) {
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO users (user_id, email, password, nickname, provider, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      values: [user_id, email, password, nickname, provider, created_at],
    });
    return rows;
  }

  static async update({ user_id, password, nickname }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE users SET `password` = ?, `nickname` = ? WHERE `user_id` = ?",
      values: [password, nickname, user_id],
    });
    return rows;
  }

  static async updateAlert({ user_id, alert, timer }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE users SET `alert` = ?, `timer` = ? WHERE `user_id` = ?",
      values: [alert, timer, user_id],
    });
    return rows;
  }

  static async withdraw({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE users SET `withdraw_at` = NOW(), `status` = 'pending' WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }

  static async undoWithdraw({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE users SET `withdraw_at` = null, `status` = null WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }

  static async delete({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "DELETE FROM users WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }
}
export = User;
