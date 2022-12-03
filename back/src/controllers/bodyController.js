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
var bodyService_1 = __importDefault(require("../services/bodyService"));
var bodyController = /** @class */ (function () {
    function bodyController() {
    }
    // GET: 전체 운동 기록 조회 기능
    bodyController.bodyRecordlist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allBodies, err_1, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, bodyService_1.default.getAllBodies()];
                    case 1:
                        allBodies = _a.sent();
                        return [2 /*return*/, res.status(200).json(allBodies)];
                    case 2:
                        err_1 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "bodyRecordlist api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET: 특정 유저의 운동 기록 조회
    bodyController.bodyRecords = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, Bodies, err_2, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        return [4 /*yield*/, bodyService_1.default.getBodies({ user_id: user_id })];
                    case 1:
                        Bodies = _a.sent();
                        return [2 /*return*/, res.status(200).json(Bodies)];
                    case 2:
                        err_2 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "bodyRecords api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // POST: 특정 유저의 운동 기록 시작
    bodyController.bodyCreate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, tag, body, err_3, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        tag = req.body.tag;
                        return [4 /*yield*/, bodyService_1.default.addBody({
                                user_id: user_id,
                                tag: tag,
                            })];
                    case 1:
                        body = _a.sent();
                        return [2 /*return*/, res.status(200).json(body)];
                    case 2:
                        err_3 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "bodyCreate api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // PATCH: 특정 유저의 운동 기록 종료
    bodyController.bodyUpdate = function (
    // req: express.Request & { files: MulterFile[] },
    req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, body_id, body, err_4, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        body_id = req.body.body_id;
                        return [4 /*yield*/, bodyService_1.default.updateBody({
                                body_id: body_id,
                            })];
                    case 1:
                        body = _a.sent();
                        return [2 /*return*/, res.status(200).json(body)];
                    case 2:
                        err_4 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "bodyUpdate api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET: 특정 유저의 운동 기록 조회
    bodyController.bodyRecordsMonthly = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, year, Bodies, err_5, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        year = req.params.year;
                        return [4 /*yield*/, bodyService_1.default.getBodiesByMonth({ user_id: user_id, year: year })];
                    case 1:
                        Bodies = _a.sent();
                        return [2 /*return*/, res.status(200).json(Bodies)];
                    case 2:
                        err_5 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "bodyRecords api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return bodyController;
}());
module.exports = bodyController;
