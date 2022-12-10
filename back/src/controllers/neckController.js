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
var neckService_1 = __importDefault(require("../services/neckService"));
var ClientError = __importStar(require("../responses/clientErrorResponse"));
var logger = require("../config/logger");
var userController = /** @class */ (function () {
    function userController() {
    }
    // GET: 전체 거북목 테스트 결과 조회 기능
    userController.neckResultList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var getAllNecks, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, neckService_1.default.getAllNecks()];
                    case 1:
                        getAllNecks = _a.sent();
                        logger.info(getAllNecks);
                        return [2 /*return*/, res.status(200).json(getAllNecks)];
                    case 2:
                        e_1 = _a.sent();
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET: 특정 유저의 거북목 테스트 결과 조회
    userController.neckResults = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, getNecks, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        if (user_id !== req.params.user_id) {
                            throw ClientError.unauthorized("정상적으로 로그인된 사용자의 요청이 아닙니다.");
                        }
                        return [4 /*yield*/, neckService_1.default.getNecks({ user_id: user_id })];
                    case 1:
                        getNecks = _a.sent();
                        logger.info(getNecks);
                        return [2 /*return*/, res.status(200).json(getNecks)];
                    case 2:
                        e_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // POST: 거북목 테스트 결과 기록
    userController.neckCreate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, filename, result, score, addNeck, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        if (user_id !== req.params.user_id) {
                            throw ClientError.unauthorized("정상적으로 로그인된 사용자의 요청이 아닙니다.");
                        }
                        filename = req.file.filename;
                        result = req.body.result;
                        score = req.body.score;
                        return [4 /*yield*/, neckService_1.default.addNeck({
                                user_id: user_id,
                                result: result,
                                score: score,
                                filename: filename,
                            })];
                    case 1:
                        addNeck = _a.sent();
                        logger.info(addNeck);
                        return [2 /*return*/, res.status(200).json(addNeck)];
                    case 2:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET: 특정 유저의 거북목 기록 조회 year
    userController.neckRecordsYear = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, year, getNecksByYear, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        if (user_id !== req.params.user_id) {
                            throw ClientError.unauthorized("정상적으로 로그인된 사용자의 요청이 아닙니다.");
                        }
                        year = req.params.year;
                        return [4 /*yield*/, neckService_1.default.getNecksByYear({
                                user_id: user_id,
                                year: year,
                            })];
                    case 1:
                        getNecksByYear = _a.sent();
                        logger.info(getNecksByYear);
                        return [2 /*return*/, res.status(200).json(getNecksByYear)];
                    case 2:
                        e_4 = _a.sent();
                        next(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return userController;
}());
module.exports = userController;
