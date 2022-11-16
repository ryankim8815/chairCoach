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
var User_1 = __importDefault(require("../db/models/User"));
var Attendance_1 = __importDefault(require("../db/models/Attendance"));
var uuid_1 = require("uuid");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var attendanceService = /** @class */ (function () {
    function attendanceService() {
    }
    //// 출석 생성
    attendanceService.createAtnd = function (_a) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var created_at, user, userString, userObject, user_id, created_at_date, checkToday, checkTodayString, checkTodayObject, result_errUpdate, atnd_id, newAtnd, newAtndString, newAtndObject, affectedRows, checkNewAtnd, checkNewAtndString, checkNewAtndObject, result_success, result_errCreate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        user_id = userObject[0].user_id;
                        created_at_date = created_at.split(" ")[0];
                        return [4 /*yield*/, Attendance_1.default.findByCreatedAtDateUserId({
                                created_at_date: created_at_date,
                                user_id: user_id,
                            })];
                    case 2:
                        checkToday = _b.sent();
                        checkTodayString = JSON.stringify(checkToday);
                        checkTodayObject = JSON.parse(checkTodayString);
                        if (!(checkTodayObject.length > 0)) return [3 /*break*/, 3];
                        result_errUpdate = {
                            result: false,
                            cause: "attendance",
                            message: "\uAE08\uC77C \uCD9C\uC11D\uCCB4\uD06C\uAC00 \uC644\uB8CC\uB41C \uC0AC\uC6A9\uC790\uC785\uB2C8\uB2E4.",
                        };
                        return [2 /*return*/, result_errUpdate];
                    case 3:
                        atnd_id = (0, uuid_1.v4)();
                        return [4 /*yield*/, Attendance_1.default.create({
                                atnd_id: atnd_id,
                                user_id: user_id,
                                created_at: created_at,
                            })];
                    case 4:
                        newAtnd = _b.sent();
                        newAtndString = JSON.stringify(newAtnd);
                        newAtndObject = JSON.parse(newAtndString);
                        affectedRows = newAtndObject.affectedRows;
                        return [4 /*yield*/, Attendance_1.default.findByAtndId({ atnd_id: atnd_id })];
                    case 5:
                        checkNewAtnd = _b.sent();
                        checkNewAtndString = JSON.stringify(checkNewAtnd);
                        checkNewAtndObject = JSON.parse(checkNewAtndString);
                        if (affectedRows == 1 && checkNewAtndObject.length == 1) {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "\uCD9C\uAC00\uCCB4\uD06C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_success];
                        }
                        else {
                            result_errCreate = {
                                result: false,
                                cause: "create",
                                message: "\uCD9C\uC11D\uCCB4\uD06C \uC0DD\uC131 \uC911\uC5D0 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errCreate];
                        }
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return attendanceService;
}());
module.exports = attendanceService;
