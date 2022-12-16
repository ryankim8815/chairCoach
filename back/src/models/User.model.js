"use strict";
var _1 = require("./");
// class User extends Model {
var User = /** @class */ (function () {
    function User() {
    }
    // Models
    User.findAll = function () {
        return _1.db.sequelize.query("\n    SELECT email, nickname, created_at\n    FROM users\n    ", {
            type: _1.db.QueryTypes.SELECT,
        });
    };
    User.countAll = function () {
        return _1.db.sequelize.query("\n      SELECT COUNT(user_id) AS cnt\n      FROM users\n      ", {
            type: _1.db.QueryTypes.SELECT,
        });
    };
    User.findByUserId = function (_a) {
        var user_id = _a.user_id;
        return _1.db.sequelize.query("\n        SELECT user_id, password, email, nickname, provider, created_at, withdraw_at, status, alert, timer\n        FROM users\n        WHERE user_id = ?\n        ", {
            type: _1.db.QueryTypes.SELECT,
            replacements: [user_id],
        });
    };
    User.findByEmail = function (_a) {
        var email = _a.email;
        return _1.db.sequelize.query("\n        SELECT * FROM users\n        WHERE email = ?\n          ", {
            type: _1.db.QueryTypes.SELECT,
            replacements: [email],
        });
    };
    User.findByNickname = function (_a) {
        var nickname = _a.nickname;
        return _1.db.sequelize.query("\n      SELECT * FROM users\n      WHERE nickname = ?\n      ", {
            type: _1.db.QueryTypes.SELECT,
            replacements: [nickname],
        });
    };
    User.create = function (_a) {
        var user_id = _a.user_id, email = _a.email, password = _a.password, nickname = _a.nickname, provider = _a.provider, transaction = _a.transaction;
        return _1.db.sequelize.query("\n        INSERT INTO users (user_id, email, password, nickname, provider) VALUES (?, ?, ?, ?, ?)\n              ", {
            type: _1.db.QueryTypes.INSERT,
            replacements: [user_id, email, password, nickname, provider],
            transaction: transaction,
        });
    };
    User.update = function (_a) {
        var user_id = _a.user_id, password = _a.password, nickname = _a.nickname;
        return _1.db.sequelize.query("\n        UPDATE users SET password = ?, nickname = ?\n        WHERE user_id = ?\n              ", {
            type: _1.db.QueryTypes.UPDATE,
            replacements: [password, nickname, user_id],
        });
    };
    User.updateNickname = function (_a) {
        var user_id = _a.user_id, provider = _a.provider, nickname = _a.nickname;
        return _1.db.sequelize.query("\n        UPDATE users SET nickname = ?\n        WHERE user_id = ? AND provider = ?\n              ", {
            type: _1.db.QueryTypes.UPDATE,
            replacements: [nickname, user_id, provider],
        });
    };
    User.updateAlert = function (_a) {
        var user_id = _a.user_id, alert = _a.alert, timer = _a.timer;
        return _1.db.sequelize.query("\n        UPDATE users SET alert = ?, timer = ?\n        WHERE user_id = ?\n                ", {
            type: _1.db.QueryTypes.UPDATE,
            replacements: [alert, timer, user_id],
        });
    };
    User.withdraw = function (_a) {
        var user_id = _a.user_id;
        return _1.db.sequelize.query("\n        UPDATE users SET withdraw_at = NOW(), status = 'pending' WHERE user_id = ?\n                  ", {
            type: _1.db.QueryTypes.UPDATE,
            replacements: [user_id],
        });
    };
    User.undoWithdraw = function (_a) {
        var user_id = _a.user_id;
        return _1.db.sequelize.query("\n        UPDATE users SET withdraw_at = null, status = null\n        WHERE user_id = ?\n                    ", {
            type: _1.db.QueryTypes.UPDATE,
            replacements: [user_id],
        });
    };
    User.delete = function (_a) {
        var user_id = _a.user_id;
        return _1.db.sequelize.query("\n        DELETE FROM users\n        WHERE user_id = ?\n                      ", {
            type: _1.db.QueryTypes.DELETE,
            replacements: [user_id],
        });
    };
    return User;
}());
module.exports = User;
