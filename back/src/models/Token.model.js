"use strict";
var index_1 = require("./index");
var Token = /** @class */ (function () {
    function Token() {
    }
    // Models
    Token.create = function (_a) {
        var email = _a.email, code = _a.code;
        return index_1.db.sequelize.query("\n      REPLACE INTO tokens (email, code) \n      VALUES (?, ?)\n        ", {
            type: index_1.db.QueryTypes.REPLACE,
            replacements: [email, code],
        });
    };
    Token.findByEmail = function (_a) {
        var email = _a.email;
        return index_1.db.sequelize.query("\n      SELECT code FROM tokens \n      WHERE email = ?\n        ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [email],
        });
    };
    return Token;
}());
module.exports = Token;
