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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var uuid_1 = require("uuid");
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
        var email = _a.email, access_token = _a.access_token;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, checkEmailString, checkEmailObject, result_errEmail, thisUser, secretKey, token, result_success, result_errDB, user_id, password, nickname, provider, created_at, newUser, newUserString, newUserObject, checkNewUser, checkNewUserString, checkNewUserObject, thisUser, secretKey, token, result_success, result_errDB;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        checkEmailString = JSON.stringify(checkEmail);
                        checkEmailObject = JSON.parse(checkEmailString);
                        if (checkEmailObject.length !== 0 &&
                            checkEmailObject[0].provider !== "kakao") {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "kakao 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        else if (checkEmailObject.length == 1 &&
                            checkEmailObject[0].provider == "kakao") {
                            thisUser = checkEmailObject[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            delete thisUser.user_id;
                            result_success = Object.assign({
                                result: true,
                                cause: "success",
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            }, { token: token }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else if (checkEmailObject.length > 1) {
                            result_errDB = Object.assign({
                                result: false,
                                cause: "DB",
                                message: "[\uD655\uC778\uC694\uB9DD]: DB\uC5D0 \uD574\uB2F9 \uC774\uBA54\uC77C(".concat(email, ")\uB85C \uAC00\uC785\uB41C \uC0AC\uC6A9\uC790\uAC00 1\uBA85 \uC774\uC0C1\uC785\uB2C8\uB2E4. \uC815\uCC45\uC0C1 \uC774\uBA54\uC77C \uD558\uB098\uB85C \uACC4\uC815 \uD558\uB098\uB9CC \uC0DD\uC131 \uAC00\uB2A5 \uD569\uB2C8\uB2E4."),
                            });
                            return [2 /*return*/, result_errDB];
                        }
                        user_id = (0, uuid_1.v4)();
                        password = access_token;
                        nickname = "".concat(email, "_kakao");
                        provider = "kakao";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, User_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                created_at: created_at,
                            })];
                    case 2:
                        newUser = _b.sent();
                        newUserString = JSON.stringify(newUser);
                        newUserObject = JSON.parse(newUserString);
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 3:
                        checkNewUser = _b.sent();
                        checkNewUserString = JSON.stringify(checkNewUser);
                        checkNewUserObject = JSON.parse(checkNewUserString);
                        if (newUserObject.affectedRows == 1 && checkNewUserObject.length == 1) {
                            thisUser = checkNewUserObject[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            delete thisUser.user_id;
                            result_success = Object.assign({
                                result: true,
                                cause: "success",
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            }, { token: token }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else {
                            result_errDB = {
                                result: false,
                                cause: "DB",
                                message: "[\uD655\uC778\uC694\uB9DD]: \uC0AC\uC6A9\uC790 \uC815\uBCF4\uB97C DB\uC5D0 \uC800\uC7A5 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errDB];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////
    /////////////  네  이  버  ///////////////
    ////////////////////////////////////////
    //// 네이버 간편로그인 가입 & 로그인
    socialLoginService.naver = function (_a) {
        var email = _a.email, access_token = _a.access_token;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, checkEmailString, checkEmailObject, result_errEmail, thisUser, secretKey, token, result_success, result_errDB, user_id, password, nickname, provider, created_at, newUser, newUserString, newUserObject, checkNewUser, checkNewUserString, checkNewUserObject, thisUser, secretKey, token, result_success, result_errDB;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        checkEmailString = JSON.stringify(checkEmail);
                        checkEmailObject = JSON.parse(checkEmailString);
                        if (checkEmailObject.length !== 0 &&
                            checkEmailObject[0].provider !== "naver") {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "naver 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        else if (checkEmailObject.length == 1 &&
                            checkEmailObject[0].provider == "naver") {
                            thisUser = checkEmailObject[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            delete thisUser.user_id;
                            result_success = Object.assign({
                                result: true,
                                cause: "success",
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            }, { token: token }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else if (checkEmailObject.length > 1) {
                            result_errDB = Object.assign({
                                result: false,
                                cause: "DB",
                                message: "[\uD655\uC778\uC694\uB9DD]: DB\uC5D0 \uD574\uB2F9 \uC774\uBA54\uC77C(".concat(email, ")\uB85C \uAC00\uC785\uB41C \uC0AC\uC6A9\uC790\uAC00 1\uBA85 \uC774\uC0C1\uC785\uB2C8\uB2E4. \uC815\uCC45\uC0C1 \uC774\uBA54\uC77C \uD558\uB098\uB85C \uACC4\uC815 \uD558\uB098\uB9CC \uC0DD\uC131 \uAC00\uB2A5 \uD569\uB2C8\uB2E4."),
                            });
                            return [2 /*return*/, result_errDB];
                        }
                        user_id = (0, uuid_1.v4)();
                        password = access_token;
                        nickname = "".concat(email, "_naver");
                        provider = "naver";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, User_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                created_at: created_at,
                            })];
                    case 2:
                        newUser = _b.sent();
                        newUserString = JSON.stringify(newUser);
                        newUserObject = JSON.parse(newUserString);
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 3:
                        checkNewUser = _b.sent();
                        checkNewUserString = JSON.stringify(checkNewUser);
                        checkNewUserObject = JSON.parse(checkNewUserString);
                        if (newUserObject.affectedRows == 1 && checkNewUserObject.length == 1) {
                            thisUser = checkNewUserObject[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            delete thisUser.user_id;
                            result_success = Object.assign({
                                result: true,
                                cause: "success",
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            }, { token: token }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else {
                            result_errDB = {
                                result: false,
                                cause: "DB",
                                message: "[\uD655\uC778\uC694\uB9DD]: \uC0AC\uC6A9\uC790 \uC815\uBCF4\uB97C DB\uC5D0 \uC800\uC7A5 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errDB];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////
    /////////////   구   글   ///////////////
    ////////////////////////////////////////
    //// 네이버 간편로그인 가입 & 로그인
    socialLoginService.google = function (_a) {
        var email = _a.email, refresh_token = _a.refresh_token;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, checkEmailString, checkEmailObject, result_errEmail, thisUser, secretKey, token, result_success, result_errDB, user_id, password, nickname, provider, created_at, newUser, newUserString, newUserObject, checkNewUser, checkNewUserString, checkNewUserObject, thisUser, secretKey, token, result_success, result_errDB;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        checkEmailString = JSON.stringify(checkEmail);
                        checkEmailObject = JSON.parse(checkEmailString);
                        if (checkEmailObject.length !== 0 &&
                            checkEmailObject[0].provider !== "google") {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "google 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        else if (checkEmailObject.length == 1 &&
                            checkEmailObject[0].provider == "google") {
                            thisUser = checkEmailObject[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            delete thisUser.user_id;
                            result_success = Object.assign({
                                result: true,
                                cause: "success",
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            }, { token: token }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else if (checkEmailObject.length > 1) {
                            result_errDB = Object.assign({
                                result: false,
                                cause: "DB",
                                message: "[\uD655\uC778\uC694\uB9DD]: DB\uC5D0 \uD574\uB2F9 \uC774\uBA54\uC77C(".concat(email, ")\uB85C \uAC00\uC785\uB41C \uC0AC\uC6A9\uC790\uAC00 1\uBA85 \uC774\uC0C1\uC785\uB2C8\uB2E4. \uC815\uCC45\uC0C1 \uC774\uBA54\uC77C \uD558\uB098\uB85C \uACC4\uC815 \uD558\uB098\uB9CC \uC0DD\uC131 \uAC00\uB2A5 \uD569\uB2C8\uB2E4."),
                            });
                            return [2 /*return*/, result_errDB];
                        }
                        user_id = (0, uuid_1.v4)();
                        password = refresh_token;
                        nickname = "".concat(email, "_google");
                        provider = "google";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, User_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                created_at: created_at,
                            })];
                    case 2:
                        newUser = _b.sent();
                        newUserString = JSON.stringify(newUser);
                        newUserObject = JSON.parse(newUserString);
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 3:
                        checkNewUser = _b.sent();
                        checkNewUserString = JSON.stringify(checkNewUser);
                        checkNewUserObject = JSON.parse(checkNewUserString);
                        if (newUserObject.affectedRows == 1 && checkNewUserObject.length == 1) {
                            thisUser = checkNewUserObject[0];
                            secretKey = process.env.JWT_SECRET_KEY;
                            token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                            delete thisUser.password;
                            delete thisUser.user_id;
                            result_success = Object.assign({
                                result: true,
                                cause: "success",
                                message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            }, { token: token }, thisUser);
                            return [2 /*return*/, result_success];
                        }
                        else {
                            result_errDB = {
                                result: false,
                                cause: "DB",
                                message: "[\uD655\uC778\uC694\uB9DD]: \uC0AC\uC6A9\uC790 \uC815\uBCF4\uB97C DB\uC5D0 \uC800\uC7A5 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                            };
                            return [2 /*return*/, result_errDB];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return socialLoginService;
}());
module.exports = socialLoginService;
