import promisePool from "../database";
class Neck {
  static async findAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM necks",
    });
    console.log("row: ", rows);
    return rows;
  }
  static async countAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(neck_id) AS cnt FROM necks",
    });
    return rows;
  }

  static async create({
    neck_id,
    user_id,
    result,
    score,
    filename,
    created_at,
  }) {
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO necks (neck_id, user_id, result, score, filename, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      values: [neck_id, user_id, result, score, filename, created_at],
    });
    return rows;
  }
}
export = Neck;
