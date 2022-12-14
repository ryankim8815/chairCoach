"use strict";
// import { User } from "./User.model";
var index_1 = require("./index");
var Body = /** @class */ (function () {
    function Body() {
    }
    // Models
    // 전체 기록 조회
    Body.findAll = function () {
        return index_1.db.sequelize.query("\n          SELECT * \n          FROM bodies\n            ", {
            type: index_1.db.QueryTypes.SELECT,
        });
    };
    // 전체 기록 개수 조회
    Body.countAll = function () {
        return index_1.db.sequelize.query("\n        SELECT count(body_id) AS cnt \n        FROM bodies\n              ", {
            type: index_1.db.QueryTypes.SELECT,
        });
    };
    // 특정 유저의 기록 조회
    Body.findByUserId = function (_a) {
        var user_id = _a.user_id;
        return index_1.db.sequelize.query("\n        SELECT * FROM bodies \n        WHERE user_id = ?\n            ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [user_id],
        });
    };
    // 특정 유저의 기록 개수 조회
    Body.countByUserId = function (_a) {
        var user_id = _a.user_id;
        return index_1.db.sequelize.query("\n        SELECT count(body_id) AS cnt \n        FROM bodies \n        WHERE user_id = ?\n            ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [user_id],
        });
    };
    // 기록 시작
    Body.create = function (_a) {
        var body_id = _a.body_id, user_id = _a.user_id, tag = _a.tag;
        return index_1.db.sequelize.query("\n        INSERT INTO bodies (body_id, user_id, tag) \n        VALUES (?, ?, ?)\n              ", {
            type: index_1.db.QueryTypes.INSERT,
            replacements: [body_id, user_id, tag],
        });
    };
    // 특정 기록 조회 - 기록 종료 확인용
    Body.findByBodyId = function (_a) {
        var body_id = _a.body_id;
        return index_1.db.sequelize.query("\n        SELECT start_time, end_time \n        FROM bodies \n        WHERE body_id = ?\n              ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [body_id],
        });
    };
    // 기록 종료(sec)
    Body.patch = function (_a) {
        var body_id = _a.body_id, end_time = _a.end_time;
        return index_1.db.sequelize.query("\n        UPDATE bodies \n        SET end_time = ?, duration = TIMESTAMPDIFF(SECOND, start_time, ?) \n        WHERE body_id = ?\n              ", {
            type: index_1.db.QueryTypes.UPDATE,
            replacements: [end_time, end_time, body_id],
        });
    };
    // 특정 유저의 기록 조회 - week
    Body.findByUserIdWeek = function (_a) {
        var user_id = _a.user_id, year = _a.year, week = _a.week;
        return index_1.db.sequelize.query("\n        SELECT DATE_FORMAT(start_time, '%Y-%m-%d') AS date, tag, COUNT(user_id) AS count, SUM(duration) AS duration \n        FROM bodies \n        WHERE NOT duration IS NULL \n        AND user_id = ? \n        AND DATE_FORMAT(start_time, '%Y') = ?\n        AND DATE_FORMAT(start_time, '%u') = ? \n        GROUP BY tag, DATE_FORMAT(start_time, '%Y-%m-%d')\n                ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [user_id, year, week],
        });
    };
    // 특정 유저의 기록 조회 - year
    Body.findByUserIdYear = function (_a) {
        var user_id = _a.user_id, year = _a.year;
        return index_1.db.sequelize.query("\n        SELECT DATE_FORMAT(start_time, '%Y-%m') AS month, tag, COUNT(user_id) AS count, SUM(duration) AS duration \n        FROM bodies \n        WHERE NOT duration IS NULL \n        AND user_id = ? \n        AND DATE_FORMAT(start_time, '%Y') = ? \n        GROUP BY tag, DATE_FORMAT(start_time, '%Y-%m')\n                ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [user_id, year],
        });
    };
    return Body;
}());
module.exports = Body;
