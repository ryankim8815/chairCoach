"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// import Body from "../db/models/Body";
var Body_model_1 = __importDefault(require("../models/Body.model"));
var nullPrototypeHandler_1 = require("../utils/nullPrototypeHandler");
var ClientError = __importStar(require("../responses/clientErrorResponse"));
var uuid_1 = require("uuid");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var bodyService = /** @class */ (function () {
    function bodyService() {
    }
    //// 전체 운동 기록 조회 기능
    bodyService.getAllBodies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allBodies, countBodies, result_success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Body_model_1.default.findAll()];
                    case 1:
                        allBodies = _a.sent();
                        return [4 /*yield*/, Body_model_1.default.countAll()];
                    case 2:
                        countBodies = _a.sent();
                        result_success = Object.assign({
                            result: true,
                            message: "\uC804\uCCB4 \uC6B4\uB3D9 \uAE30\uB85D \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            count: countBodies[0].cnt,
                            list: allBodies,
                        });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 특정 유저의 운동 기록 조회
    bodyService.getBodies = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var Bodies, countBodies, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Body_model_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        Bodies = _b.sent();
                        return [4 /*yield*/, Body_model_1.default.countByUserId({ user_id: user_id })];
                    case 2:
                        countBodies = _b.sent();
                        result_success = Object.assign({
                            result: true,
                            message: "\uD574\uB2F9 \uC720\uC800\uC758 \uC6B4\uB3D9 \uAE30\uB85D \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            count: countBodies[0].cnt,
                            list: Bodies,
                        });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 특정 유저의 운동 기록 시작
    bodyService.addBody = function (_a) {
        var user_id = _a.user_id, tag = _a.tag;
        return __awaiter(this, void 0, void 0, function () {
            var body_id, newBody, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body_id = (0, uuid_1.v4)();
                        return [4 /*yield*/, Body_model_1.default.create({
                                body_id: body_id,
                                user_id: user_id,
                                tag: tag,
                                // start_time,
                            })];
                    case 1:
                        newBody = _b.sent();
                        result_success = Object.assign({
                            result: true,
                            message: "\uD574\uB2F9 \uC720\uC800\uC758 \uC6B4\uB3D9 \uAE30\uB85D \uC2DC\uC791\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            body_id: body_id,
                        });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 특정 유저의 운동 기록 종료
    bodyService.updateBody = function (_a) {
        var body_id = _a.body_id;
        return __awaiter(this, void 0, void 0, function () {
            var checkBody, _b, end_time, newBody, result_success;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, Body_model_1.default.findByBodyId({ body_id: body_id })];
                    case 1:
                        checkBody = _b.apply(void 0, [_c.sent()]);
                        if (checkBody.length == 0) {
                            return [2 /*return*/, ClientError.notFound("patch를 요청한 body_id 정보와 일치하는 데이터가 없습니다. 다시 한 번 확인해 주세요.")];
                        }
                        else if (checkBody[0].end_time) {
                            return [2 /*return*/, ClientError.conflict("patch를 요청한 body_id의 end_time은 이미 업데이트 되어있습니다. 다시 한 번 확인해 주세요.")];
                        }
                        end_time = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, Body_model_1.default.patch({
                                body_id: body_id,
                                end_time: end_time,
                            })];
                    case 2:
                        newBody = _c.sent();
                        result_success = Object.assign({
                            result: true,
                            message: "\uD574\uB2F9 \uC720\uC800\uC758 \uC6B4\uB3D9 \uAE30\uB85D \uC885\uB8CC\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 특정 유저의 운동 기록 조회 - week
    bodyService.getBodiesByWeek = function (_a) {
        var user_id = _a.user_id, year = _a.year, week = _a.week;
        return __awaiter(this, void 0, void 0, function () {
            var Bodies, _b, result_success;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, Body_model_1.default.findByUserIdWeek({ user_id: user_id, year: year, week: week })];
                    case 1:
                        Bodies = _b.apply(void 0, [_c.sent()]);
                        result_success = Object.assign({
                            result: true,
                            message: "\uD574\uB2F9 \uC720\uC800\uC758 \uC6B4\uB3D9 \uAE30\uB85D \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            list: Bodies,
                        });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 특정 유저의 운동 기록 조회 - year
    bodyService.getBodiesByYear = function (_a) {
        var user_id = _a.user_id, year = _a.year;
        return __awaiter(this, void 0, void 0, function () {
            var Bodies, _b, result_success;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, Body_model_1.default.findByUserIdYear({ user_id: user_id, year: year })];
                    case 1:
                        Bodies = _b.apply(void 0, [_c.sent()]);
                        result_success = Object.assign({
                            result: true,
                            message: "\uD574\uB2F9 \uC720\uC800\uC758 \uC6B4\uB3D9 \uAE30\uB85D \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            list: Bodies,
                        });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    return bodyService;
}());
module.exports = bodyService;
