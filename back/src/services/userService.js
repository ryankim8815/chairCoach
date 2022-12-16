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
// import Code from "../db/models/Code";
var User_model_1 = __importDefault(require("../models/User.model"));
var Code_model_1 = __importDefault(require("../models/Code.model"));
var nullPrototypeHandler_1 = require("../utils/nullPrototypeHandler");
var ClientError = __importStar(require("../responses/clientErrorResponse"));
var ServerError = __importStar(require("../responses/serverErrorResponse"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var uuid_1 = require("uuid");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var Token_model_1 = __importDefault(require("../models/Token.model"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var userService = /** @class */ (function () {
    function userService() {
    }
    //// 모든 사용자 조회
    userService.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, countUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.findAll()];
                    case 1:
                        allUsers = _a.sent();
                        return [4 /*yield*/, User_model_1.default.countAll()];
                    case 2:
                        countUsers = _a.sent();
                        return [2 /*return*/, { count: countUsers[0].cnt, list: allUsers }];
                }
            });
        });
    };
    //// 현재 사용자 조회
    userService.getCurrentUser = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, thisUser, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        currentUser = _b.sent();
                        if (currentUser.length === 0) {
                            throw ClientError.notFound("정상적으로 로그인된 사용자의 요청이 아닙니다.");
                        }
                        if (currentUser.length > 1) {
                            throw ServerError.internalServerError("[확인요망]: 해당 user_id로 조회된 계정이 DB상 두개 이상입니다. 확인해 주세요.");
                        }
                        thisUser = currentUser[0];
                        delete thisUser.password;
                        result_success = Object.assign({
                            result: true,
                            message: "\uD574\uB2F9 \uC0AC\uC6A9\uC790 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        }, thisUser);
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 로그인용 사용자 조회
    userService.getUser = function (_a) {
        var email = _a.email, password = _a.password, ipAddress = _a.ipAddress;
        return __awaiter(this, void 0, void 0, function () {
            var user, thisUser, hashedCorrectPassword, isPasswordCorrect, user_id_1, withdrawnUser, secretKey, accessToken, refreshToken, status, created_at, user_id, tokenUpdate, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.findByEmail({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (user.length === 0) {
                            throw ClientError.unauthorized("입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.");
                        }
                        thisUser = user[0];
                        hashedCorrectPassword = thisUser.password;
                        return [4 /*yield*/, bcrypt_1.default.compare(password, hashedCorrectPassword)];
                    case 2:
                        isPasswordCorrect = _b.sent();
                        if (!isPasswordCorrect) {
                            throw ClientError.unauthorized("입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
                        }
                        if (!(user[0].status == "pending")) return [3 /*break*/, 4];
                        user_id_1 = thisUser.user_id;
                        return [4 /*yield*/, User_model_1.default.undoWithdraw({ user_id: user_id_1 })];
                    case 3:
                        withdrawnUser = _b.sent();
                        if (withdrawnUser[1] === 0) {
                            throw ServerError.internalServerError("[확인요망] 탈퇴한 사용자 계정 복구 과정에서 오류가 발생했습니다.");
                        }
                        else {
                            thisUser.status = null;
                            thisUser.withdraw_at = null;
                        }
                        _b.label = 4;
                    case 4:
                        secretKey = process.env.JWT_SECRET_KEY;
                        accessToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        refreshToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                            user_id: thisUser.user_id,
                        }, secretKey);
                        status = "valid";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        user_id = thisUser.user_id;
                        return [4 /*yield*/, Token_model_1.default.update({
                                user_id: user_id,
                                refreshToken: refreshToken,
                                accessToken: accessToken,
                                ipAddress: ipAddress,
                                status: status,
                                created_at: created_at,
                            })];
                    case 5:
                        tokenUpdate = _b.sent();
                        if (tokenUpdate[1]) {
                            delete thisUser.password;
                            result_success = Object.assign({
                                result: true,
                                message: "\uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                // token: token,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ///////////////////////////
    //// 자체 회원가입 로직 시작/////
    ///////////////////////////
    //
    //// 회원가입 전 이메일 인증
    userService.sendCode = function (_a) {
        var email = _a.email, code = _a.code;
        return __awaiter(this, void 0, void 0, function () {
            var saveCode, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Code_model_1.default.create({
                            email: email,
                            code: code,
                        })];
                    case 1:
                        saveCode = _b.sent();
                        if (saveCode[0].affectedRows > 0) {
                            result = {
                                result: true,
                                message: "code \uBC1C\uAE09\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //// 이메일 인증 코드 확인 절차
    userService.verifyCode = function (_a) {
        var email = _a.email, code = _a.code;
        return __awaiter(this, void 0, void 0, function () {
            var checkCode, isCorrectCode, deleteCode, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Code_model_1.default.findByEmail({
                            email: email,
                        })];
                    case 1:
                        checkCode = _b.sent();
                        if (checkCode.length == 0) {
                            throw ClientError.unauthorized("해당 이메일에 발급된 코드가 만료되었습니다.");
                        }
                        if (checkCode.length > 1) {
                            throw ServerError.internalServerError("[확인요망] 이메일 인증 코드 확인 과정에서 오류가 발견되었습니다.");
                        }
                        isCorrectCode = code == checkCode[0].code;
                        if (!isCorrectCode)
                            throw ClientError.unauthorized("email 인증에 실패했습니다.");
                        if (!isCorrectCode) return [3 /*break*/, 3];
                        return [4 /*yield*/, Code_model_1.default.delete({
                                email: email,
                            })];
                    case 2:
                        deleteCode = _b.sent();
                        result_success = {
                            result: true,
                            message: "email \uC778\uC99D\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4.",
                        };
                        return [2 /*return*/, result_success];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //// 회원가입 전 nickname 중복확인
    userService.nicknameDuplicateCheck = function (_a) {
        var nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            var checkNickname, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.findByNickname({ nickname: nickname })];
                    case 1:
                        checkNickname = _b.sent();
                        if (checkNickname.length !== 0) {
                            throw ClientError.conflict("입력하신 nickname은 이미 사용중입니다.");
                        }
                        result_success = {
                            result: true,
                            message: "\uC911\uBCF5\uB41C nickname\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uAC00\uC785\uC744 \uC9C4\uD589\uD574\uC8FC\uC138\uC694.",
                        };
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 자체 회원가입
    userService.addUser = function (_a) {
        var email = _a.email, password = _a.password, nickname = _a.nickname, ipAddress = _a.ipAddress;
        return __awaiter(this, void 0, void 0, function () {
            var user_id, provider, newUser, secretKey, accessToken, refreshToken, tokenCreate, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_id = (0, uuid_1.v4)();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 1:
                        password = _b.sent();
                        provider = "chairCoach";
                        return [4 /*yield*/, User_model_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                            })];
                    case 2:
                        newUser = _b.sent();
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
                            })];
                    case 3:
                        tokenCreate = _b.sent();
                        // console.log("tokenCreate: ", tokenCreate);
                        // 트랜젝션 적용=============================================================================
                        if (newUser[1] && tokenCreate[1]) {
                            result_success = {
                                result: true,
                                message: "\uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                // token: token,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            };
                            return [2 /*return*/, result_success];
                        }
                        throw ServerError.internalServerError("[확인요망]: DB확인이 필요합니다.");
                }
            });
        });
    };
    //
    ///////////////////////////
    //// 자체 회원가입 로직 종료/////
    ///////////////////////////
    //// 회원정보 수정을 위한 비밀번호 확인
    userService.passwordCheck = function (_a) {
        var user_id = _a.user_id, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var checkPassword, thisUser, hashedCorrectPassword, isPasswordCorrect, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        checkPassword = _b.sent();
                        if (checkPassword.length == 0) {
                            throw ClientError.unauthorized("요청하신 정보로 가입된 내역이 없습니다. 다시 한 번 확인해 주세요.");
                        }
                        thisUser = checkPassword[0];
                        hashedCorrectPassword = thisUser.password;
                        return [4 /*yield*/, bcrypt_1.default.compare(password, hashedCorrectPassword)];
                    case 2:
                        isPasswordCorrect = _b.sent();
                        if (!isPasswordCorrect) {
                            throw ClientError.unauthorized("입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
                        }
                        result_success = {
                            result: true,
                            message: "\uC785\uB825\uD558\uC2E0 password\uAC00 \uC77C\uCE58\uD569\uB2C8\uB2E4.",
                        };
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 회원 정보 수정
    userService.updateUser = function (_a) {
        var user_id = _a.user_id, password = _a.password, nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            var updatedUser, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 1:
                        password = _b.sent();
                        return [4 /*yield*/, User_model_1.default.update({
                                user_id: user_id,
                                password: password,
                                nickname: nickname,
                            })];
                    case 2:
                        updatedUser = _b.sent();
                        if (updatedUser[1] !== 1)
                            throw ServerError.internalServerError("[확인요망] 업데이트 과정트서 오류가 발견되었습니다.");
                        result_success = {
                            result: true,
                            message: "\uD68C\uC6D0\uC815\uBCF4 \uC218\uC815\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        };
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 회원 정보 수정 - 간편로그인 회원용
    userService.updateSocialLoginUser = function (_a) {
        var user_id = _a.user_id, provider = _a.provider, nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            var updatedUser, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.updateNickname({
                            user_id: user_id,
                            provider: provider,
                            nickname: nickname,
                        })];
                    case 1:
                        updatedUser = _b.sent();
                        if (updatedUser[1] !== 1)
                            throw ServerError.internalServerError("[확인요망] 업데이트 과정트서 오류가 발견되었습니다.");
                        result_success = {
                            result: true,
                            message: "\uD68C\uC6D0\uC815\uBCF4 \uC218\uC815\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        };
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 회원정보 삭제 -> 탈퇴
    userService.deleteUser = function (_a) {
        var user_id = _a.user_id, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var checkUserId, _b, thisUser, hashedCorrectPassword, isPasswordCorrect, updatedUser, _c, result_success;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_model_1.default.findByUserId({ user_id: user_id })];
                    case 1:
                        checkUserId = _b.apply(void 0, [_d.sent()]);
                        if (checkUserId.length === 0) {
                            throw ClientError.unauthorized("요청하신 정보로 가입된 내역이 없습니다. 다시 한 번 확인해 주세요.");
                        }
                        thisUser = checkUserId[0];
                        hashedCorrectPassword = thisUser.password;
                        return [4 /*yield*/, bcrypt_1.default.compare(password, hashedCorrectPassword)];
                    case 2:
                        isPasswordCorrect = _d.sent();
                        if (!isPasswordCorrect) {
                            throw ClientError.unauthorized("입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
                        }
                        _c = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, User_model_1.default.withdraw({
                                user_id: user_id,
                            })];
                    case 3:
                        updatedUser = _c.apply(void 0, [_d.sent()]);
                        if (updatedUser[1] !== 1)
                            throw ServerError.internalServerError("[확인요망] 탈퇴 과정에서 오류가 발견되었습니다.");
                        result_success = {
                            result: true,
                            message: "\uD0C8\uD1F4\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4. 30\uC77C \uD6C4 \uD68C\uC6D0 \uC815\uBCF4\uAC00 \uC0AD\uC81C\uB429\uB2C8\uB2E4.",
                        };
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 알람 설정
    userService.setAlert = function (_a) {
        var user_id = _a.user_id, alert = _a.alert, timer = _a.timer;
        return __awaiter(this, void 0, void 0, function () {
            var setAlert, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_model_1.default.updateAlert({ user_id: user_id, alert: alert, timer: timer })];
                    case 1:
                        setAlert = _b.sent();
                        if (setAlert[1] !== 1)
                            throw ServerError.internalServerError("[확인요망] 기존값과 동일한 요청이거나 서버 오류입니다.");
                        result_success = {
                            result: true,
                            message: "Alert \uC5C5\uB370\uC774\uD2B8\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        };
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    return userService;
}());
module.exports = userService;
