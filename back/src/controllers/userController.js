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
var userService_1 = __importDefault(require("../services/userService"));
// import logger from "../../config/logger";
var logger = require("../../config/logger");
var userController = /** @class */ (function () {
    function userController() {
    }
    // GET: 사용자 리스트 조회 기능
    userController.userList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, count, list, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userService_1.default.getAllUsers()];
                    case 1:
                        _a = _b.sent(), count = _a.count, list = _a.list;
                        result = {
                            result: true,
                            count: count,
                            list: list,
                        };
                        logger.info(result);
                        return [2 /*return*/, res.status(200).json(result)];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET: 현재 사용자 정보 조회 기능
    userController.userCurrent = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result_err, currentUser, err_1, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        if (user_id !== req.params.user_id) {
                            result_err = {
                                result: false,
                                cause: "user_id",
                                message: "정상적으로 로그인된 사용자의 요청이 아닙니다.",
                            };
                            return [2 /*return*/, res.status(200).json(result_err)];
                        }
                        return [4 /*yield*/, userService_1.default.getCurrentUser({ user_id: user_id })];
                    case 1:
                        currentUser = _a.sent();
                        logger.error(currentUser); // test
                        return [2 /*return*/, res.status(200).json(currentUser)];
                    case 2:
                        err_1 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "userCurrent api에서 오류가 발생했습니다.",
                        };
                        logger.error(result_err); // test
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // POST: 회원가입 기능
    userController.userRegister = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, nickname, newUser, err_2, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        password = req.body.password;
                        nickname = req.body.nickname;
                        return [4 /*yield*/, userService_1.default.addUser({ email: email, password: password, nickname: nickname })];
                    case 1:
                        newUser = _a.sent();
                        return [2 /*return*/, res.status(200).json(newUser)];
                    case 2:
                        err_2 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "userRegister api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // POST: 로그인
    userController.userSignin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, signinUser, err_3, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        password = req.body.password;
                        return [4 /*yield*/, userService_1.default.getUser({ email: email, password: password })];
                    case 1:
                        signinUser = _a.sent();
                        return [2 /*return*/, res.status(200).json(signinUser)];
                    case 2:
                        err_3 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "userLogin api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // POST: 회원정보 수정을 위한 비밀번호 확인
    userController.userPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result_err, password, updateUser, err_4, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        if (user_id !== req.params.user_id) {
                            result_err = {
                                result: false,
                                cause: "user_id",
                                message: "정상적으로 로그인된 사용자의 요청이 아닙니다.",
                            };
                            return [2 /*return*/, res.status(200).json(result_err)];
                        }
                        password = req.body.password;
                        return [4 /*yield*/, userService_1.default.passwordCheck({
                                user_id: user_id,
                                password: password,
                            })];
                    case 1:
                        updateUser = _a.sent();
                        return [2 /*return*/, res.status(200).json(updateUser)];
                    case 2:
                        err_4 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "userPassword api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // POST: 회원정보 수정
    userController.userUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result_err, currentPassword, password, nickname, updateUser, err_5, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        if (user_id !== req.params.user_id) {
                            result_err = {
                                result: false,
                                cause: "user_id",
                                message: "정상적으로 로그인된 사용자의 요청이 아닙니다.",
                            };
                            return [2 /*return*/, res.status(200).json(result_err)];
                        }
                        currentPassword = req.body.currentPassword;
                        password = req.body.password;
                        nickname = req.body.nickname;
                        return [4 /*yield*/, userService_1.default.updateUser({
                                user_id: user_id,
                                currentPassword: currentPassword,
                                password: password,
                                nickname: nickname,
                            })];
                    case 1:
                        updateUser = _a.sent();
                        return [2 /*return*/, res.status(200).json(updateUser)];
                    case 2:
                        err_5 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "userUpdate api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE: 회원정보 삭제
    userController.userDelete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result_err, password, deleteUser, err_6, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        if (user_id !== req.params.user_id) {
                            result_err = {
                                result: false,
                                cause: "user_id",
                                message: "정상적으로 로그인된 사용자의 요청이 아닙니다.",
                            };
                            return [2 /*return*/, res.status(200).json(result_err)];
                        }
                        password = req.body.password;
                        return [4 /*yield*/, userService_1.default.deleteUser({
                                user_id: user_id,
                                password: password,
                            })];
                    case 1:
                        deleteUser = _a.sent();
                        return [2 /*return*/, res.status(200).json(deleteUser)];
                    case 2:
                        err_6 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "userDelete api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /// POST: email 인증을 위한 코드 발송
    userController.signupEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, code, sendCodeToEmail, err_7, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.body.email;
                        code = req.body.code;
                        return [4 /*yield*/, userService_1.default.sendCode({
                                // redis 활용 고려
                                email: email,
                                code: code,
                            })];
                    case 1:
                        sendCodeToEmail = _a.sent();
                        return [2 /*return*/, res.status(200).json(sendCodeToEmail)];
                    case 2:
                        err_7 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "signupEmail api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /// GET: email 인증 코드 확인
    userController.signupVerifyEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, code, verifyEmailCode, err_8, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = req.params.email;
                        code = req.params.code;
                        return [4 /*yield*/, userService_1.default.verifyCode({
                                email: email,
                                code: code,
                            })];
                    case 1:
                        verifyEmailCode = _a.sent();
                        return [2 /*return*/, res.status(200).json(verifyEmailCode)];
                    case 2:
                        err_8 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "signupVerifyEmail api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /// GET: nickname 중복확인
    userController.signupNickname = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var nickname, checkNickname, err_9, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        nickname = req.params.nickname;
                        return [4 /*yield*/, userService_1.default.nicknameDuplicateCheck({
                                nickname: nickname,
                            })];
                    case 1:
                        checkNickname = _a.sent();
                        return [2 /*return*/, res.status(200).json(checkNickname)];
                    case 2:
                        err_9 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "signupNickname api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /// PATCH: 알람 설정
    userController.userSetAlert = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result_err, alert_1, timer, setAlert, err_10, result_err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.body.user_id;
                        if (user_id !== req.params.user_id) {
                            result_err = {
                                result: false,
                                cause: "user_id",
                                message: "정상적으로 로그인된 사용자의 요청이 아닙니다.",
                            };
                            return [2 /*return*/, res.status(200).json(result_err)];
                        }
                        alert_1 = req.body.alert;
                        timer = req.body.timer;
                        return [4 /*yield*/, userService_1.default.setAlert({
                                user_id: user_id,
                                alert: alert_1,
                                timer: timer,
                            })];
                    case 1:
                        setAlert = _a.sent();
                        return [2 /*return*/, res.status(200).json(setAlert)];
                    case 2:
                        err_10 = _a.sent();
                        result_err = {
                            result: false,
                            cause: "api",
                            message: "userSetAlert api에서 오류가 발생했습니다.",
                        };
                        return [2 /*return*/, res.status(200).json(result_err)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return userController;
}());
module.exports = userController;
