"use strict";
var index_1 = require("./index");
var Code = /** @class */ (function () {
    function Code() {
    }
    // Models
    Code.create = function (_a) {
        var email = _a.email, code = _a.code;
        return index_1.db.sequelize.query("\n      REPLACE INTO codes (email, code) \n      VALUES (?, ?)\n        ", {
            type: index_1.db.QueryTypes.REPLACE,
            replacements: [email, code],
        });
    };
    Code.findByEmail = function (_a) {
        var email = _a.email;
        return index_1.db.sequelize.query("\n      SELECT code FROM codes \n      WHERE email = ?\n        ", {
            type: index_1.db.QueryTypes.SELECT,
            replacements: [email],
        });
    };
    Code.delete = function (_a) {
        var email = _a.email;
        return index_1.db.sequelize.query("\n      DELETE FROM codes\n      WHERE email = ?\n        ", {
            type: index_1.db.QueryTypes.DELETE,
            replacements: [email],
        });
    };
    return Code;
}());
module.exports = Code;
