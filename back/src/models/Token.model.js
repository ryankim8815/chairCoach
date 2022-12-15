"use strict";
var index_1 = require("./index");
var Token = /** @class */ (function () {
    function Token() {
    }
    // Models
    Token.create = function (_a) {
        var user_id = _a.user_id, refreshToken = _a.refreshToken, accessToken = _a.accessToken, ipAddress = _a.ipAddress;
        return index_1.db.sequelize.query("\n      INSERT INTO tokens (user_id, refresh_token, access_token, ip_address, status) \n      VALUES (?, ?, ?, ?, ?)\n        ", {
            type: index_1.db.QueryTypes.INSERT,
            replacements: [user_id, refreshToken, accessToken, ipAddress, "valid"],
        });
    };
    Token.update = function (_a) {
        var user_id = _a.user_id, refreshToken = _a.refreshToken, accessToken = _a.accessToken, ipAddress = _a.ipAddress, status = _a.status, created_at = _a.created_at;
        return index_1.db.sequelize.query("\n      UPDATE tokens\n      SET   refresh_token = ?,\n            access_token = ?,\n            ip_address = ?,\n            status = ?,\n            created_at = ? \n      WHERE user_id = ? \n        ", {
            type: index_1.db.QueryTypes.UPDATE,
            replacements: [
                refreshToken,
                accessToken,
                ipAddress,
                status,
                created_at,
                user_id,
            ],
        });
    };
    Token.reissue = function (_a) {
        var currentRefreshToken = _a.currentRefreshToken, refreshToken = _a.refreshToken, accessToken = _a.accessToken, ipAddress = _a.ipAddress, status = _a.status, created_at = _a.created_at;
        return index_1.db.sequelize.query("\n      UPDATE tokens\n      SET   refresh_token = ?,\n            access_token = ?,\n            ip_address = ?,\n            status = ?,\n            created_at = ? \n      WHERE refresh_token = ? \n        ", {
            type: index_1.db.QueryTypes.UPDATE,
            replacements: [
                refreshToken,
                accessToken,
                ipAddress,
                status,
                created_at,
                currentRefreshToken,
            ],
        });
    };
    Token.findByRefreshToken = function (_a) {
        var currentRefreshToken = _a.currentRefreshToken;
        return index_1.db.sequelize.query("\n        SELECT * FROM tokens\n        WHERE refresh_token = ?\n          ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [currentRefreshToken],
        });
    };
    return Token;
}());
module.exports = Token;
