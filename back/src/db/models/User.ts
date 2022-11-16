import promisePool from "../database";
class User {
  static async findAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT email,nickname,profile_image,created_at  FROM users",
    });
    return rows;
  }
  static async countAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(user_id) AS cnt FROM users",
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

  static async update({ email, password, nickname }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE users SET `password` = ?, `nickname` = ? WHERE `email` = ?",
      values: [password, nickname, email],
    });
    return rows;
  }

  static async updateFilename({ email, new_filename }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE users SET `profile_image` = ? WHERE `email` = ?",
      values: [new_filename, email],
    });
    return rows;
  }

  static async delete({ email }) {
    const [rows, fields] = await promisePool.query({
      sql: "DELETE FROM users WHERE `email` = ?",
      values: [email],
    });
    return rows;
  }
}
export = User;
