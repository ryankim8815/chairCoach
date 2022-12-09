"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var _a = require("sequelize"), Sequelize = _a.Sequelize, Model = _a.Model, DataTypes = _a.DataTypes, Deferrable = _a.Deferrable;
var sequelize_1 = __importDefault(require("../config/sequelize"));
var index_1 = require("./index");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Models
    User.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                index_1.db.sequelize.query("\n    SELECT email, nickname, created_at  \n    FROM users\n    ", {
                    type: index_1.db.QueryTypes.SELECT,
                });
                return [2 /*return*/];
            });
        });
    };
    User.countAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                index_1.db.sequelize.query("\n        SELECT count(user_id) AS cnt \n        FROM users\n      ", {
                    type: index_1.db.QueryTypes.SELECT,
                });
                return [2 /*return*/];
            });
        });
    };
    User.findByUserId = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        SELECT user_id, password, email, nickname, provider, created_at, withdraw_at, status, alert, timer  \n        FROM users \n        WHERE user_id = ?\n        ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [user_id],
                });
                return [2 /*return*/];
            });
        });
    };
    User.findByEmail = function (_a) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        SELECT * FROM users \n        WHERE email = ?\n          ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [email],
                });
                return [2 /*return*/];
            });
        });
    };
    User.findByNickname = function (_a) {
        var nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        SELECT * FROM users \n        WHERE nickname = ?\n            ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [nickname],
                });
                return [2 /*return*/];
            });
        });
    };
    User.create = function (_a) {
        var user_id = _a.user_id, email = _a.email, password = _a.password, nickname = _a.nickname, provider = _a.provider, created_at = _a.created_at;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        INSERT INTO users (user_id, email, password, nickname, provider, created_at) VALUES (?, ?, ?, ?, ?, ?)\n              ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [
                        user_id,
                        email,
                        password,
                        nickname,
                        provider,
                        created_at,
                    ],
                });
                return [2 /*return*/];
            });
        });
    };
    User.update = function (_a) {
        var user_id = _a.user_id, password = _a.password, nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        UPDATE users SET password = ?, nickname = ? \n        WHERE user_id = ?\n              ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [password, nickname, user_id],
                });
                return [2 /*return*/];
            });
        });
    };
    User.updateAlert = function (_a) {
        var user_id = _a.user_id, alert = _a.alert, timer = _a.timer;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        UPDATE users SET alert = ?, timer = ? \n        WHERE user_id = ?\n                ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [alert, timer, user_id],
                });
                return [2 /*return*/];
            });
        });
    };
    User.withdraw = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        UPDATE users SET withdraw_at = NOW(), status = pending WHERE user_id = ?\n                  ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [user_id],
                });
                return [2 /*return*/];
            });
        });
    };
    User.undoWithdraw = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        UPDATE users SET withdraw_at = null, status = null \n        WHERE user_id = ?\n                    ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [user_id],
                });
                return [2 /*return*/];
            });
        });
    };
    User.delete = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        DELETE FROM users \n        WHERE user_id = ?\n                      ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [user_id],
                });
                return [2 /*return*/];
            });
        });
    };
    return User;
}(Model));
exports.User = User;
// Schemas
User.init({
    user_id: {
        // type: DataTypes.CHAR(36),   // mysql for UUID
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    nickname: {
        type: DataTypes.STRING(12),
        unique: true,
        allowNull: false,
    },
    provider: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    created_at: {
        type: "TIMESTAMP",
        defaultValue: index_1.db.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    withdraw_at: {
        type: "TIMESTAMP",
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    alert: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    timer: {
        type: DataTypes.INTEGER,
        defaultValue: "0",
        allowNull: false,
    },
}, {
    sequelize: sequelize_1.default,
    modelName: "user",
    timestamps: true,
    charset: "utf8mb4",
    paranoid: true, // soft deletion
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    // indexes: [{ unique: true, fields: ["someUnique"] }], // field를 정의하면 getter setter 활용가능
});
