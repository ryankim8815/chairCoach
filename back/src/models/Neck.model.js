"use strict";
var _a = require("sequelize"), Sequelize = _a.Sequelize, Model = _a.Model, DataTypes = _a.DataTypes, Deferrable = _a.Deferrable;
// import { User } from "./User.model";
var index_1 = require("./index");
var Neck = /** @class */ (function () {
    function Neck() {
    }
    // Models
    // 전체 기록 조회
    Neck.findAll = function () {
        return index_1.db.sequelize.query("\n        SELECT * \n        FROM necks\n          ", {
            type: index_1.db.QueryTypes.SELECT,
        });
    };
    // 전체 기록 개수 조회
    Neck.countAll = function () {
        return index_1.db.sequelize.query("\n        SELECT count(neck_id) AS cnt \n        FROM necks\n            ", {
            type: index_1.db.QueryTypes.SELECT,
        });
    };
    // 특정 유저의 기록 조회
    Neck.findByUserId = function (_a) {
        var user_id = _a.user_id;
        return index_1.db.sequelize.query("\n        SELECT * FROM necks \n        WHERE user_id = ?\n          ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [user_id],
        });
    };
    // 특정 유저의 기록 개수 조회
    Neck.countByUserId = function (_a) {
        var user_id = _a.user_id;
        return index_1.db.sequelize.query("\n        SELECT count(neck_id) AS cnt \n        FROM necks WHERE user_id = ?\n            ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [user_id],
        });
    };
    // 기록 등록
    Neck.create = function (_a) {
        var neck_id = _a.neck_id, user_id = _a.user_id, result = _a.result, score = _a.score, filename = _a.filename;
        return index_1.db.sequelize.query("\n        INSERT INTO necks (neck_id, user_id, result, score, filename) \n        VALUES (?, ?, ?, ?, ?)\n              ", {
            type: index_1.db.QueryTypes.INSERT,
            replacements: [neck_id, user_id, result, score, filename],
        });
    };
    // 특정 유저의 기록 조회 - year
    Neck.findByUserIdYear = function (_a) {
        var user_id = _a.user_id, year = _a.year;
        return index_1.db.sequelize.query("\n        SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(user_id) AS count, AVG(score) AS avg \n        FROM necks \n        WHERE NOT score IS NULL \n        AND user_id = ? \n        AND DATE_FORMAT(created_at, '%Y') = ? \n        GROUP BY DATE_FORMAT(created_at, '%Y-%m')\n              ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [user_id, year],
        });
    };
    return Neck;
}());
module.exports = Neck;
