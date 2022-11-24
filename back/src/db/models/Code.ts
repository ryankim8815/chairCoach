import promisePool from "../database";
class Code {
  static async create({ email, code }) {
    const [rows, fields] = await promisePool.query({
      //   sql: "INSERT INTO codes (email, code) VALUES (?, ?)",
      sql: "REPLACE INTO codes (email, code, created_at) VALUES (?, ?, NOW())",
      values: [email, code],
    });
    return rows;
  }

  static async delete({ email }) {
    const [rows, fields] = await promisePool.query({
      sql: "DELETE FROM codes WHERE `email` = ?",
      values: [email],
    });
    return rows;
  }
}
export = Code;
