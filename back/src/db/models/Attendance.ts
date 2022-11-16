import promisePool from "../database";
class Attendance {
  // atnd_id로 검색
  static async findByAtndId({ atnd_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM attendances  WHERE `atnd_id` = ?",
      values: [atnd_id],
    });
    return rows;
  }

  // user_id로 검색
  static async findByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM attendances WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }

  // atnd_id와 user_id로 검색
  static async findByLikeIdUserId({ atnd_id, user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM attendances WHERE `atnd_id` = ? AND `user_id` = ?",
      values: [atnd_id, user_id],
    });
    return rows;
  }

  // 등록일로 검색
  static async findByCreatedAtDate({ created_at_date }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM attendances WHERE DATE_FORMAT(`created_at`, `$Y-%m-%d`) = DATE_FORMAT(?, `%Y-$m-$d`)",
      values: [created_at_date],
    });
    return rows;
  }
  // 등록기간으로 검색
  static async findByCreatedAtDuration({ created_at_from, created_at_to }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM attendances WHERE `created_at` BETWEEN ? AND ?",
      values: [created_at_from, created_at_to],
    });
    return rows;
  }
  // 등록
  static async create({ atnd_id, user_id, created_at }) {
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO attendances (atnd_id, user_id, created_at) VALUES (?, ?, ?)",
      values: [atnd_id, user_id, created_at],
    });
    return rows;
  }
  // 삭제
  static async delete({ atnd_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "DELETE FROM attendances WHERE `atnd_id` = ?",
      values: [atnd_id],
    });
    return rows;
  }
}
export = Attendance;
