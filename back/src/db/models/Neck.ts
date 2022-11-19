import promisePool from "../database";
class Neck {
  // 전체 기록 조회
  static async findAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM necks",
    });
    return rows;
  }

  // 전체 기록 개수 조회
  static async countAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(neck_id) AS cnt FROM necks",
    });
    return rows;
  }

  // 특정 유저의 기록 조회
  static async findByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM necks WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }

  // 특정 유저의 기록 개수 조회
  static async countByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(neck_id) AS cnt FROM necks WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
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
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO necks (neck_id, user_id, result, score, filename, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      values: [neck_id, user_id, result, score, filename, created_at],
    });
    return rows;
  }
}
export = Neck;
