import promisePool from "../database";
class Body {
  // 전체 기록 조회
  static async findAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM bodies",
    });
    return rows;
  }

  // 전체 기록 개수 조회
  static async countAll() {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(body_id) AS cnt FROM bodies",
    });
    return rows;
  }

  // 특정 유저의 기록 조회
  static async findByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT * FROM bodies WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }

  // 특정 유저의 기록 개수 조회
  static async countByUserId({ user_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT count(body_id) AS cnt FROM bodies WHERE `user_id` = ?",
      values: [user_id],
    });
    return rows;
  }

  // 기록 시작
  static async create({ body_id, user_id, tag, start_time }) {
    const [rows, fields] = await promisePool.query({
      sql: "INSERT INTO bodies (body_id, user_id, tag, start_time) VALUES (?, ?, ?, ?)",
      values: [body_id, user_id, tag, start_time],
    });
    return rows;
  }

  // 특정 기록 조회 - 기록 종료 확인용
  static async findByBodyId({ body_id }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT start_time, end_time FROM bodies WHERE `body_id` = ?",
      values: [body_id],
    });
    return rows;
  }

  // 기록 종료(sec)
  static async patch({ body_id, end_time }) {
    const [rows, fields] = await promisePool.query({
      sql: "UPDATE bodies SET `end_time` = ?, `duration` = TIMESTAMPDIFF(SECOND, `start_time`, ?) WHERE `body_id` = ?",
      values: [end_time, end_time, body_id],
    });
    return rows;
  }

  // 특정 유저의 기록 조회 - week
  static async findByUserIdWeek({ user_id, year, week }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT DATE_FORMAT(`start_time`,'%Y-%m-%d') AS date, tag, COUNT(`user_id`) AS count, SUM(duration) AS duration FROM bodies WHERE NOT `duration` IS NULL AND `user_id` = ? AND DATE_FORMAT(`start_time`, '%Y') = ? AND DATE_FORMAT(`start_time`, '%u') = ? GROUP BY tag, DATE_FORMAT(`start_time`, '%Y-%m-%d')",
      values: [user_id, year, week],
    });
    return rows;
  }

  // 특정 유저의 기록 조회 - year
  static async findByUserIdYear({ user_id, year }) {
    const [rows, fields] = await promisePool.query({
      sql: "SELECT DATE_FORMAT(`start_time`,'%Y-%m') AS month, tag, COUNT(`user_id`) AS count, SUM(duration) AS duration FROM bodies WHERE NOT `duration` IS NULL AND `user_id` = ? AND DATE_FORMAT(`start_time`, '%Y') = ? GROUP BY tag, DATE_FORMAT(`start_time`, '%Y-%m')",
      values: [user_id, year],
    });
    return rows;
  }
}
export = Body;
