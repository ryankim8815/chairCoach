"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var database_1 = __importDefault(require("../database"));
var User = /** @class */ (function () {
    function User() {
    }
    User.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rows, fields;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT email,nickname,created_at  FROM users",
                        })];
                    case 1:
                        _a = _b.sent(), rows = _a[0], fields = _a[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.countAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rows, fields;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT count(user_id) AS cnt FROM users",
                        })];
                    case 1:
                        _a = _b.sent(), rows = _a[0], fields = _a[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.findByUserId = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM users WHERE `user_id` = ?",
                            values: [user_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.findByEmail = function (_a) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM users WHERE `email` = ?",
                            values: [email],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.findByNickname = function (_a) {
        var nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "SELECT * FROM users WHERE `nickname` = ?",
                            values: [nickname],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.create = function (_a) {
        var user_id = _a.user_id, email = _a.email, password = _a.password, nickname = _a.nickname, provider = _a.provider, created_at = _a.created_at;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "INSERT INTO users (user_id, email, password, nickname, provider, created_at) VALUES (?, ?, ?, ?, ?, ?)",
                            values: [user_id, email, password, nickname, provider, created_at],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.update = function (_a) {
        var user_id = _a.user_id, password = _a.password, nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "UPDATE users SET `password` = ?, `nickname` = ? WHERE `user_id` = ?",
                            values: [password, nickname, user_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.updateAlert = function (_a) {
        var user_id = _a.user_id, alert = _a.alert, timer = _a.timer;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "UPDATE users SET `alert` = ?, `timer` = ? WHERE `user_id` = ?",
                            values: [alert, timer, user_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.withdraw = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "UPDATE users SET `withdraw_at` = NOW(), `status` = 'pending' WHERE `user_id` = ?",
                            values: [user_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.undoWithdraw = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "UPDATE users SET `withdraw_at` = null, `status` = null WHERE `user_id` = ?",
                            values: [user_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    User.delete = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, rows, fields;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, database_1.default.query({
                            sql: "DELETE FROM users WHERE `user_id` = ?",
                            values: [user_id],
                        })];
                    case 1:
                        _b = _c.sent(), rows = _b[0], fields = _b[1];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    return User;
}());
module.exports = User;
