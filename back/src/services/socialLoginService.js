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
var User_1 = __importDefault(require("../db/models/User"));
var nullPrototypeHandler_1 = require("../utils/nullPrototypeHandler");
var ClientError = __importStar(require("../responses/clientErrorResponse"));
var ServerError = __importStar(require("../responses/serverErrorResponse"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var uuid_1 = require("uuid");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var socialLoginService = /** @class */ (function () {
    function socialLoginService() {
    }
    ////////////////////////////////////////
    /////////////  ???  ???  ???  ///////////////
    ////////////////////////////////////////
    //// ????????? ??????????????? ?????? & ?????????
    socialLoginService.kakao = function (_a) {
        var email = _a.email, access_token = _a.access_token;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, _b, thisUser, secretKey, token, result_success, user_id, password, nickname, provider, created_at, newUser, _c, checkNewUser, _d, thisUser, secretKey, token, result_success;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.apply(void 0, [_e.sent()]);
                        if (checkEmail.length !== 0 && checkEmail[0].provider !== "kakao") {
                            throw ClientError.unauthorized("kakao ????????? email??? ?????? ????????? ????????? ????????????. ?????? ??? ??? ????????? ?????????.");
                        }
                        else if (checkEmail.length == 1 && checkEmail[0].provider == "kakao") {
                            thisUser = checkEmail[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            result_success = Object.assign({
                                result: true,
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                                token: token,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else if (checkEmail.length > 1) {
                            throw ServerError.internalServerError("[????????????]: ?????? ???????????? ????????? ???????????? 2??? ???????????????. ????????? ????????? ????????? ?????? ????????? ?????? ?????? ?????????.");
                        }
                        user_id = (0, uuid_1.v4)();
                        password = access_token;
                        nickname = "".concat(email, "_kakao");
                        provider = "kakao";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        _c = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                created_at: created_at,
                            })];
                    case 2:
                        newUser = _c.apply(void 0, [_e.sent()]);
                        _d = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 3:
                        checkNewUser = _d.apply(void 0, [_e.sent()]);
                        if (newUser.affectedRows == 1 && checkNewUser.length == 1) {
                            thisUser = checkNewUser[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            result_success = Object.assign({
                                result: true,
                                message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                token: token,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////
    /////////////  ???  ???  ???  ///////////////
    ////////////////////////////////////////
    //// ????????? ??????????????? ?????? & ?????????
    socialLoginService.naver = function (_a) {
        var email = _a.email, access_token = _a.access_token;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, _b, thisUser, secretKey, token, result_success, user_id, password, nickname, provider, created_at, newUser, _c, checkNewUser, _d, thisUser, secretKey, token, result_success;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.apply(void 0, [_e.sent()]);
                        if (checkEmail.length !== 0 && checkEmail[0].provider !== "naver") {
                            throw ClientError.unauthorized("naver ????????? email??? ?????? ????????? ????????? ????????????. ?????? ??? ??? ????????? ?????????.");
                        }
                        else if (checkEmail.length == 1 && checkEmail[0].provider == "naver") {
                            thisUser = checkEmail[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            result_success = Object.assign({
                                result: true,
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                                token: token,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else if (checkEmail.length > 1) {
                            throw ServerError.internalServerError("[????????????]: ?????? ???????????? ????????? ???????????? 2??? ???????????????. ????????? ????????? ????????? ?????? ????????? ?????? ?????? ?????????.");
                        }
                        user_id = (0, uuid_1.v4)();
                        password = access_token;
                        nickname = "".concat(email, "_naver");
                        provider = "naver";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        _c = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                created_at: created_at,
                            })];
                    case 2:
                        newUser = _c.apply(void 0, [_e.sent()]);
                        _d = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 3:
                        checkNewUser = _d.apply(void 0, [_e.sent()]);
                        if (newUser.affectedRows == 1 && checkNewUser.length == 1) {
                            thisUser = checkNewUser[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            result_success = Object.assign({
                                result: true,
                                message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                token: token,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////
    /////////////   ???   ???   ///////////////
    ////////////////////////////////////////
    //// ????????? ??????????????? ?????? & ?????????
    socialLoginService.google = function (_a) {
        var email = _a.email, refresh_token = _a.refresh_token;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, _b, thisUser, secretKey, token, result_success, user_id, password, nickname, provider, created_at, newUser, _c, checkNewUser, _d, thisUser, secretKey, token, result_success;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.apply(void 0, [_e.sent()]);
                        if (checkEmail.length !== 0 && checkEmail[0].provider !== "google") {
                            throw ClientError.unauthorized("google ????????? email??? ?????? ????????? ????????? ????????????. ?????? ??? ??? ????????? ?????????.");
                        }
                        else if (checkEmail.length == 1 && checkEmail[0].provider == "google") {
                            thisUser = checkEmail[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            result_success = Object.assign({
                                result: true,
                                message: "\uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                token: token,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else if (checkEmail.length > 1) {
                            throw ServerError.internalServerError("[????????????]: ?????? ???????????? ????????? ???????????? 2??? ???????????????. ????????? ????????? ????????? ?????? ????????? ?????? ?????? ?????????.");
                        }
                        user_id = (0, uuid_1.v4)();
                        password = refresh_token;
                        nickname = "".concat(email, "_google");
                        provider = "google";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        _c = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                created_at: created_at,
                            })];
                    case 2:
                        newUser = _c.apply(void 0, [_e.sent()]);
                        _d = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 3:
                        checkNewUser = _d.apply(void 0, [_e.sent()]);
                        if (newUser.affectedRows == 1 && checkNewUser.length == 1) {
                            thisUser = checkNewUser[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            result_success = Object.assign({
                                result: true,
                                message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                token: token,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return socialLoginService;
}());
module.exports = socialLoginService;
