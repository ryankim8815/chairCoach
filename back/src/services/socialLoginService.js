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
// import User from "../db/models/User";
var User_model_1 = __importDefault(require("../models/User.model"));
var Token_model_1 = __importDefault(require("../models/Token.model"));
var ClientError = __importStar(require("../responses/clientErrorResponse"));
var ServerError = __importStar(require("../responses/serverErrorResponse"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var uuid_1 = require("uuid");
var models_1 = require("../models");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var socialLoginService = /** @class */ (function () {
    function socialLoginService() {
    }
    ////////////////////////////////////////
    /////////////  카  카  오  ///////////////
    ////////////////////////////////////////
    //// 카카오 간편로그인 가입 & 로그인
    socialLoginService.kakao = function (_a) {
        var email = _a.email, access_token = _a.access_token, ipAddress = _a.ipAddress;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, thisUser, user_id, secretKey, accessToken, refreshToken, status_1, created_at, tokenUpdate, result_success, transaction, user_id, password, nickname, provider, newUser, checkNewUser, thisUser, secretKey, accessToken, refreshToken, tokenCreate, result_success, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        // console.log("통과됌.", checkEmail);
                        if (checkEmail.length !== 0 && checkEmail[0].provider !== "kakao")
                            throw ClientError.unauthorized("kakao 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.");
                        if (!(checkEmail.length == 1 && checkEmail[0].provider == "kakao")) return [3 /*break*/, 3];
                        thisUser = checkEmail[0];
                        user_id = checkEmail[0].user_id;
                        delete thisUser.password;
                        secretKey = process.env.JWT_SECRET_KEY;
                        accessToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        refreshToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        status_1 = "valid";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, Token_model_1.default.update({
                                user_id: user_id,
                                refreshToken: refreshToken,
                                accessToken: accessToken,
                                ipAddress: ipAddress,
                                status: status_1,
                                created_at: created_at,
                            })];
                    case 2:
                        tokenUpdate = _b.sent();
                        if (tokenUpdate[1]) {
                            result_success = Object.assign({
                                result: true,
                                message: "\uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                // token: token,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        _b.label = 3;
                    case 3:
                        if (checkEmail.length > 1) {
                            throw ServerError.internalServerError("[확인요망]: 해당 이메일로 가입된 사용자가 2명 이상입니다. 정책상 이메일 하나로 계정 하나만 생성 가능 합니다.");
                        }
                        return [4 /*yield*/, models_1.db.sequelize.transaction()];
                    case 4:
                        transaction = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 12, , 14]);
                        user_id = (0, uuid_1.v4)();
                        password = access_token;
                        nickname = "".concat(email, "_kakao");
                        provider = "kakao";
                        return [4 /*yield*/, User_model_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                transaction: transaction,
                            })];
                    case 6:
                        newUser = _b.sent();
                        return [4 /*yield*/, User_model_1.default.findByEmail({ email: email })];
                    case 7:
                        checkNewUser = _b.sent();
                        if (!(newUser[1] == 1 && checkNewUser.length == 1)) return [3 /*break*/, 11];
                        thisUser = checkNewUser[0];
                        delete thisUser.password;
                        secretKey = process.env.JWT_SECRET_KEY;
                        accessToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        refreshToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        return [4 /*yield*/, Token_model_1.default.create({
                                user_id: user_id,
                                refreshToken: refreshToken,
                                accessToken: accessToken,
                                ipAddress: ipAddress,
                                transaction: transaction,
                            })];
                    case 8:
                        tokenCreate = _b.sent();
                        if (!(newUser[1] && tokenCreate[1])) return [3 /*break*/, 10];
                        result_success = Object.assign({
                            result: true,
                            message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            // token: token,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        }, thisUser);
                        return [4 /*yield*/, transaction.commit()];
                    case 9:
                        _b.sent();
                        return [2 /*return*/, result_success];
                    case 10: throw ServerError.internalServerError("[확인요망]: DB확인이 필요합니다.");
                    case 11:
                        if (newUser[1] !== 1 ||
                            checkNewUser.length == 0 ||
                            checkNewUser.length > 1)
                            throw ServerError.internalServerError("[확인요망]: DB확인이 필요합니다.");
                        return [3 /*break*/, 14];
                    case 12:
                        e_1 = _b.sent();
                        return [4 /*yield*/, transaction.rollback()];
                    case 13:
                        _b.sent();
                        throw ServerError.internalServerError("[\uD655\uC778\uC694\uB9DD]: transaction - ".concat(e_1));
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////
    /////////////  네  이  버  ///////////////
    ////////////////////////////////////////
    //// 네이버 간편로그인 가입 & 로그인
    socialLoginService.naver = function (_a) {
        var email = _a.email, access_token = _a.access_token, ipAddress = _a.ipAddress;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, thisUser, user_id, secretKey, accessToken, refreshToken, status_2, created_at, tokenUpdate, result_success, transaction, user_id, password, nickname, provider, newUser, checkNewUser, thisUser, secretKey, accessToken, refreshToken, tokenCreate, result_success, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        if (checkEmail.length !== 0 && checkEmail[0].provider !== "naver")
                            throw ClientError.unauthorized("naver 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.");
                        if (!(checkEmail.length == 1 && checkEmail[0].provider == "naver")) return [3 /*break*/, 3];
                        thisUser = checkEmail[0];
                        user_id = checkEmail[0].user_id;
                        delete thisUser.password;
                        secretKey = process.env.JWT_SECRET_KEY;
                        accessToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        refreshToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        status_2 = "valid";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, Token_model_1.default.update({
                                user_id: user_id,
                                refreshToken: refreshToken,
                                accessToken: accessToken,
                                ipAddress: ipAddress,
                                status: status_2,
                                created_at: created_at,
                            })];
                    case 2:
                        tokenUpdate = _b.sent();
                        if (tokenUpdate[1]) {
                            result_success = Object.assign({
                                result: true,
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                                // token: token,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        _b.label = 3;
                    case 3:
                        if (checkEmail.length > 1)
                            throw ServerError.internalServerError("[확인요망]: 해당 이메일로 가입된 사용자가 2명 이상입니다. 정책상 이메일 하나로 계정 하나만 생성 가능 합니다.");
                        return [4 /*yield*/, models_1.db.sequelize.transaction()];
                    case 4:
                        transaction = _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 12, , 14]);
                        user_id = (0, uuid_1.v4)();
                        password = access_token;
                        nickname = "".concat(email, "_naver");
                        provider = "naver";
                        return [4 /*yield*/, User_model_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                transaction: transaction,
                            })];
                    case 6:
                        newUser = _b.sent();
                        return [4 /*yield*/, User_model_1.default.findByEmail({ email: email })];
                    case 7:
                        checkNewUser = _b.sent();
                        if (!(newUser[1] == 1 && checkNewUser.length == 1)) return [3 /*break*/, 11];
                        thisUser = checkNewUser[0];
                        delete thisUser.password;
                        secretKey = process.env.JWT_SECRET_KEY;
                        accessToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            user_id: user_id,
                        }, secretKey);
                        refreshToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                            user_id: user_id,
                        }, secretKey);
                        return [4 /*yield*/, Token_model_1.default.create({
                                user_id: user_id,
                                refreshToken: refreshToken,
                                accessToken: accessToken,
                                ipAddress: ipAddress,
                                transaction: transaction,
                            })];
                    case 8:
                        tokenCreate = _b.sent();
                        if (!(newUser[1] && tokenCreate[1])) return [3 /*break*/, 10];
                        result_success = Object.assign({
                            result: true,
                            message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            // token: token,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        }, thisUser);
                        return [4 /*yield*/, transaction.commit()];
                    case 9:
                        _b.sent();
                        return [2 /*return*/, result_success];
                    case 10: throw ServerError.internalServerError("[확인요망]: DB확인이 필요합니다.");
                    case 11:
                        if (newUser[1] !== 1 ||
                            checkNewUser.length == 0 ||
                            checkNewUser.length > 1)
                            throw ServerError.internalServerError("[확인요망]: DB확인이 필요합니다.");
                        return [3 /*break*/, 14];
                    case 12:
                        e_2 = _b.sent();
                        return [4 /*yield*/, transaction.rollback()];
                    case 13:
                        _b.sent();
                        throw ServerError.internalServerError("[\uD655\uC778\uC694\uB9DD]: transaction - ".concat(e_2));
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////
    /////////////   구   글   ///////////////
    ////////////////////////////////////////
    //// 네이버 간편로그인 가입 & 로그인
    socialLoginService.google = function (_a) {
        var email = _a.email, refresh_token = _a.refresh_token, ipAddress = _a.ipAddress;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, thisUser, user_id_1, secretKey, accessToken, refreshToken, status_3, created_at, tokenUpdate, result_success, user_id, password, nickname, provider, transaction, newUser, checkNewUser, thisUser, secretKey, accessToken, refreshToken, tokenCreate, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        if (checkEmail.length !== 0 && checkEmail[0].provider !== "google")
                            throw ClientError.unauthorized("google 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.");
                        if (!(checkEmail.length == 1 && checkEmail[0].provider == "google")) return [3 /*break*/, 3];
                        thisUser = checkEmail[0];
                        user_id_1 = checkEmail[0].user_id;
                        delete thisUser.password;
                        secretKey = process.env.JWT_SECRET_KEY;
                        accessToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        refreshToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        status_3 = "valid";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, Token_model_1.default.update({
                                user_id: user_id_1,
                                refreshToken: refreshToken,
                                accessToken: accessToken,
                                ipAddress: ipAddress,
                                status: status_3,
                                created_at: created_at,
                            })];
                    case 2:
                        tokenUpdate = _b.sent();
                        if (tokenUpdate[1]) {
                            result_success = Object.assign({
                                result: true,
                                message: "\uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                // token: token,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        _b.label = 3;
                    case 3:
                        if (checkEmail.length > 1)
                            throw ServerError.internalServerError("[확인요망]: 해당 이메일로 가입된 사용자가 2명 이상입니다. 정책상 이메일 하나로 계정 하나만 생성 가능 합니다.");
                        user_id = (0, uuid_1.v4)();
                        password = refresh_token;
                        nickname = "".concat(email, "_google");
                        provider = "google";
                        transaction = null;
                        return [4 /*yield*/, User_model_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                transaction: transaction,
                            })];
                    case 4:
                        newUser = _b.sent();
                        return [4 /*yield*/, User_model_1.default.findByEmail({ email: email })];
                    case 5:
                        checkNewUser = _b.sent();
                        if (!(newUser[1] == 1 && checkNewUser.length == 1)) return [3 /*break*/, 9];
                        thisUser = checkNewUser[0];
                        delete thisUser.password;
                        secretKey = process.env.JWT_SECRET_KEY;
                        accessToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            user_id: user_id,
                        }, secretKey);
                        refreshToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                            user_id: user_id,
                        }, secretKey);
                        return [4 /*yield*/, Token_model_1.default.create({
                                user_id: user_id,
                                refreshToken: refreshToken,
                                accessToken: accessToken,
                                ipAddress: ipAddress,
                                transaction: transaction,
                            })];
                    case 6:
                        tokenCreate = _b.sent();
                        if (!(newUser[1] && tokenCreate[1])) return [3 /*break*/, 8];
                        result_success = Object.assign({
                            result: true,
                            message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            // token: token,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        }, thisUser);
                        return [4 /*yield*/, transaction.commit()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, result_success];
                    case 8: throw ServerError.internalServerError("[확인요망]: DB확인이 필요합니다.");
                    case 9:
                        if (newUser[1] !== 1 || checkNewUser.length == 0 || checkNewUser.length > 1)
                            throw ServerError.internalServerError("[확인요망]: DB확인이 필요합니다.");
                        return [2 /*return*/];
                }
            });
        });
    };
    return socialLoginService;
}());
module.exports = socialLoginService;
