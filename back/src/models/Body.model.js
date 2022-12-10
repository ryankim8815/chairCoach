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
exports.Body = void 0;
var _a = require("sequelize"), Sequelize = _a.Sequelize, Model = _a.Model, DataTypes = _a.DataTypes, Deferrable = _a.Deferrable;
var sequelize_1 = __importDefault(require("../config/sequelize"));
// import { User } from "./User.model";
var index_1 = require("./index");
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Models
    // 전체 기록 조회
    Body.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                index_1.db.sequelize.query("\n          SELECT * \n          FROM bodies\n            ", {
                    type: index_1.db.QueryTypes.SELECT,
                });
                return [2 /*return*/];
            });
        });
    };
    // 전체 기록 개수 조회
    Body.countAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                index_1.db.sequelize.query("\n        SELECT count(body_id) AS cnt \n        FROM bodies\n              ", {
                    type: index_1.db.QueryTypes.SELECT,
                });
                return [2 /*return*/];
            });
        });
    };
    // 특정 유저의 기록 조회
    Body.findByUserId = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        SELECT * FROM bodies \n        WHERE user_id = ?\n            ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [user_id],
                });
                return [2 /*return*/];
            });
        });
    };
    // 특정 유저의 기록 개수 조회
    Body.countByUserId = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        SELECT count(body_id) AS cnt \n        FROM bodies \n        WHERE user_id = ?\n            ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [user_id],
                });
                return [2 /*return*/];
            });
        });
    };
    // 기록 시작
    Body.create = function (_a) {
        var body_id = _a.body_id, user_id = _a.user_id, tag = _a.tag, start_time = _a.start_time;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        INSERT INTO bodies (body_id, user_id, tag, start_time) \n        VALUES (?, ?, ?, ?)\n              ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [body_id, user_id, tag, start_time],
                });
                return [2 /*return*/];
            });
        });
    };
    // 특정 기록 조회 - 기록 종료 확인용
    Body.findByBodyId = function (_a) {
        var body_id = _a.body_id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        SELECT start_time, end_time \n        FROM bodies \n        WHERE body_id = ?\n              ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [body_id],
                });
                return [2 /*return*/];
            });
        });
    };
    // 기록 종료(sec)
    Body.patch = function (_a) {
        var body_id = _a.body_id, end_time = _a.end_time;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        UPDATE bodies \n        SET end_time = ?, duration = TIMESTAMPDIFF(SECOND, start_time, ?) \n        WHERE body_id = ?\n              ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [end_time, end_time, body_id],
                });
                return [2 /*return*/];
            });
        });
    };
    // 특정 유저의 기록 조회 - week
    Body.findByUserIdWeek = function (_a) {
        var user_id = _a.user_id, year = _a.year, week = _a.week;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        SELECT DATE_FORMAT(start_time, %Y-%m-%d) AS date, tag, COUNT(user_id) AS count, SUM(duration) AS duration \n        FROM bodies \n        WHERE NOT duration IS NULL \n        AND user_id = ? \n        AND DATE_FORMAT(start_time, %Y) = ?\n        AND DATE_FORMAT(start_time, %u) = ? \n        GROUP BY tag, DATE_FORMAT(start_time, %Y-%m-%d)\n                ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [user_id, year, week],
                });
                return [2 /*return*/];
            });
        });
    };
    // 특정 유저의 기록 조회 - year
    Body.findByUserIdYear = function (_a) {
        var user_id = _a.user_id, year = _a.year;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                index_1.db.sequelize.query("\n        SELECT DATE_FORMAT(start_time, %Y-%m) AS month, tag, COUNT(user_id) AS count, SUM(duration) AS duration \n        FROM bodies \n        WHERE NOT duration IS NULL \n        AND user_id = ? \n        AND DATE_FORMAT(start_time, %Y) = ? \n        GROUP BY tag, DATE_FORMAT(start_time, %Y-%m)\n                ", {
                    type: index_1.db.QueryTypes.SELECT,
                    replacements: [user_id, year],
                });
                return [2 /*return*/];
            });
        });
    };
    return Body;
}(Model));
exports.Body = Body;
// Schemas
Body.init({
    body_id: {
        type: index_1.db.DataTypes.UUID,
        defaultValue: index_1.db.DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: index_1.db.DataTypes.UUID,
        defaultValue: index_1.db.DataTypes.UUIDV4,
        unique: true,
        //   primaryKey: true,
        allowNull: false,
        references: {
            model: index_1.db.User,
            key: "user_id",
        },
    },
    tag: {
        type: index_1.db.DataTypes.STRING(16),
        allowNull: false,
    },
    start_time: {
        type: "TIMESTAMP",
        defaultValue: index_1.db.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    end_time: {
        type: "TIMESTAMP",
        allowNull: true,
    },
    duration: {
        type: index_1.db.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: sequelize_1.default,
    modelName: "body",
    timestamps: true,
    charset: "utf8mb4",
    paranoid: true, // soft deletion
});
