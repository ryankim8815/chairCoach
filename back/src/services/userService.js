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
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import fs from "fs";   // (FE요청) 삭제
var uuid_1 = require("uuid");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var userService = /** @class */ (function () {
    function userService() {
    }
    //// 모든 사용자 조회
    userService.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, allUsersString, allUsersObject, countUsers, countUsersString, countUsersObject, result_success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findAll()];
                    case 1:
                        allUsers = _a.sent();
                        allUsersString = JSON.stringify(allUsers);
                        allUsersObject = JSON.parse(allUsersString);
                        return [4 /*yield*/, User_1.default.countAll()];
                    case 2:
                        countUsers = _a.sent();
                        countUsersString = JSON.stringify(countUsers);
                        countUsersObject = JSON.parse(countUsersString);
                        result_success = Object.assign({
                            result: true,
                            cause: "success",
                            message: "\uBAA8\uB4E0 \uC0AC\uC6A9\uC790 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        }, { count: countUsersObject[0].cnt, list: allUsersObject });
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 현재 사용자 조회
    userService.getCurrentUser = function (_a) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, currentUserString, currentUserObject, i, result_errEmail, result_errEmail, thisUser, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        currentUser = _b.sent();
                        currentUserString = JSON.stringify(currentUser);
                        currentUserObject = JSON.parse(currentUserString);
                        // 쿼리문의 SELECT로 대체
                        for (i = 0; i < currentUserObject.length; i++) {
                            delete currentUserObject[i].password;
                            delete currentUserObject[i].user_id;
                        }
                        // const countUsers = await User.countAll();
                        // const countUsersString = JSON.stringify(countUsers);
                        // const countUsersObject = JSON.parse(countUsersString);
                        if (currentUserObject.length === 0) {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        else if (currentUserObject.length > 1) {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "[확인요망]: 해당 email로 가입된 계정이 DB상 두개 이상입니다. 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        thisUser = currentUserObject[0];
                        result_success = Object.assign({
                            result: true,
                            cause: "success",
                            message: "\uD574\uB2F9 \uC0AC\uC6A9\uC790 \uC870\uD68C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                        }, thisUser);
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 로그인용 사용자 조회
    userService.getUser = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user, userString, userObject, result_errEmail, thisUser, hashedCorrectPassword, isPasswordCorrect, result_errPassword, secretKey, token, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        user = _b.sent();
                        userString = JSON.stringify(user);
                        userObject = JSON.parse(userString);
                        if (userObject.length === 0) {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        thisUser = userObject[0];
                        hashedCorrectPassword = thisUser.password;
                        return [4 /*yield*/, bcrypt_1.default.compare(password, hashedCorrectPassword)];
                    case 2:
                        isPasswordCorrect = _b.sent();
                        if (!isPasswordCorrect) {
                            result_errPassword = {
                                result: false,
                                cause: "password",
                                message: "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errPassword];
                        }
                        secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
                        token = jsonwebtoken_1.default.sign({ email: email }, secretKey);
                        delete thisUser.password;
                        delete thisUser.user_id;
                        result_success = Object.assign({
                            result: true,
                            cause: "success",
                            message: "".concat(thisUser.nickname, "\uB2D8\uC758 \uB85C\uADF8\uC778\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            token: token,
                        }, { token: token }, thisUser);
                        return [2 /*return*/, result_success];
                }
            });
        });
    };
    //// 자체 회원가입
    userService.addUser = function (_a) {
        var email = _a.email, password = _a.password, nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, checkEmailString, checkEmailObject, result_errEmail, checkNickname, checkNicknameString, checkNicknameObject, result_errNickname, user_id, provider, created_at, newUser, newUserString, newUserObject, checkNewUser, checkNewUserString, checkNewUserObject, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        checkEmailString = JSON.stringify(checkEmail);
                        checkEmailObject = JSON.parse(checkEmailString);
                        if (checkEmailObject.length !== 0) {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "입력하신 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        return [4 /*yield*/, User_1.default.findByNickname({ nickname: nickname })];
                    case 2:
                        checkNickname = _b.sent();
                        checkNicknameString = JSON.stringify(checkNickname);
                        checkNicknameObject = JSON.parse(checkNicknameString);
                        if (checkNicknameObject.length !== 0) {
                            result_errNickname = {
                                result: false,
                                cause: "nickname",
                                message: "입력하신 nickname로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errNickname];
                        }
                        user_id = (0, uuid_1.v4)();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 3:
                        // 비밀번호 해쉬화
                        password = _b.sent();
                        provider = "chairCoach";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, User_1.default.create({
                                user_id: user_id,
                                email: email,
                                password: password,
                                nickname: nickname,
                                provider: provider,
                                created_at: created_at,
                            })];
                    case 4:
                        newUser = _b.sent();
                        newUserString = JSON.stringify(newUser);
                        newUserObject = JSON.parse(newUserString);
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 5:
                        checkNewUser = _b.sent();
                        checkNewUserString = JSON.stringify(checkNewUser);
                        checkNewUserObject = JSON.parse(checkNewUserString);
                        if (newUserObject.affectedRows == 1 && checkNewUserObject.length == 1) {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "".concat(nickname, "\uB2D8\uC758 \uD68C\uC6D0\uAC00\uC785\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            };
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //// 회원 정보 수정
    userService.updateUser = function (_a) {
        var email = _a.email, currentPassword = _a.currentPassword, password = _a.password, nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, checkEmailString, checkEmailObject, result_errEmail, thisUser, hashedCorrectPassword, isPasswordCorrect, result_errPassword, checkNickname, checkNicknameString, checkNicknameObject, result_errNickname, updatedUser, updatedUserString, updatedUserObject, checkUpdatedUser, checkUpdatedUserString, checkUpdatedUserObject, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        checkEmailString = JSON.stringify(checkEmail);
                        checkEmailObject = JSON.parse(checkEmailString);
                        if (checkEmailObject.length === 0) {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        thisUser = checkEmailObject[0];
                        hashedCorrectPassword = thisUser.password;
                        return [4 /*yield*/, bcrypt_1.default.compare(currentPassword, hashedCorrectPassword)];
                    case 2:
                        isPasswordCorrect = _b.sent();
                        if (!isPasswordCorrect) {
                            result_errPassword = {
                                result: false,
                                cause: "password",
                                message: "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errPassword];
                        }
                        return [4 /*yield*/, User_1.default.findByNickname({ nickname: nickname })];
                    case 3:
                        checkNickname = _b.sent();
                        checkNicknameString = JSON.stringify(checkNickname);
                        checkNicknameObject = JSON.parse(checkNicknameString);
                        if (checkNicknameObject.length == 1 &&
                            checkNicknameObject[0].email == email) {
                            console.log("안내: 입력된 nickname은 기존 nickname과 동일하며, 회원정보 수정이 계속 진행됩니다.");
                        }
                        else if (checkNicknameObject.length !== 0) {
                            result_errNickname = {
                                result: false,
                                cause: "nickname",
                                message: "입력하신 nickname으로 이미 가입된 사용자가 있습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errNickname];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 4:
                        // 비밀번호 해쉬화
                        password = _b.sent();
                        return [4 /*yield*/, User_1.default.update({
                                email: email,
                                password: password,
                                nickname: nickname,
                            })];
                    case 5:
                        updatedUser = _b.sent();
                        updatedUserString = JSON.stringify(updatedUser);
                        updatedUserObject = JSON.parse(updatedUserString);
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 6:
                        checkUpdatedUser = _b.sent();
                        checkUpdatedUserString = JSON.stringify(checkUpdatedUser);
                        checkUpdatedUserObject = JSON.parse(checkUpdatedUserString);
                        if (updatedUserObject.affectedRows == 1 &&
                            checkUpdatedUserObject.length == 1) {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "".concat(nickname, "\uB2D8\uC758 \uD68C\uC6D0\uC815\uBCF4 \uC218\uC815\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            };
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // (FE요청) 삭제
    // //// 프로필 사진 업로드
    // static async uploadUserImage({ email, new_filename }) {
    //   // email 확인
    //   const checkEmail = await User.findByEmail({ email });
    //   const checkEmailString = JSON.stringify(checkEmail);
    //   const checkEmailObject = JSON.parse(checkEmailString);
    //   if (checkEmailObject.length === 0) {
    //     const result_errEmail = {
    //       result: false,
    //       cause: "email",
    //       message:
    //         "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
    //     };
    //     return result_errEmail;
    //   }
    //   // db에 파일 경로 갱신
    //   const updateFilename = User.updateFilename({ email, new_filename });
    //   // 파일 삭제
    //   console.log("파일명 확인: ", checkEmailObject[0].profile_image);
    //   const old_filename = checkEmailObject[0].profile_image;
    //   //Directory 존재 여부 체크
    //   if (checkEmailObject[0].profile_image == null) {
    //     // 추후 null을 ./default.jpg로 변경 필요
    //     console.log(
    //       "기존 프로필 사진이 없습니다. 기존 사진 삭제 절차는 생략됩니다."
    //     );
    //   } else {
    //     const directory = fs.existsSync(`./uploads/${old_filename}`); //디렉토리 경로 입력
    //     console.log("삭제할 파일 경로: ", directory);
    //     //Directory가 존재 한다면 true 없다면 false
    //     console.log("Boolan : ", directory);
    //     if (!directory) {
    //       console.log(
    //         `[확인요망]: 기존 프로필 사진(파일명: ${old_filename})이 존재하지 않습니다.`
    //       );
    //     }
    //     fs.rm(`./uploads/${old_filename}`, { recursive: true }, (err) => {
    //       if (err != null) {
    //         console.log(
    //           `[확인요망]: 기존 프로필 사진(파일명: ${old_filename})을 삭제하던 중 오류가 발생했습니다. (에러 메시지: ${err})`
    //         );
    //       }
    //     });
    //   }
    //   const result_success = {
    //     result: true,
    //     cause: "success",
    //     message: `${checkEmailObject[0].nickname}님의 프로필 사진 업데이트가 성공적으로 이뤄졌습니다.`,
    //   };
    //   return result_success;
    // }
    //// 회원정보 삭제
    userService.deleteUser = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, checkEmailString, checkEmailObject, result_errEmail, thisUser, hashedCorrectPassword, isPasswordCorrect, result_errPassword, updatedUser, updatedUserString, updatedUserObject, checkUpdatedUser, checkUpdatedUserString, checkUpdatedUserObject, result_errDelete, result_success;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 1:
                        checkEmail = _b.sent();
                        checkEmailString = JSON.stringify(checkEmail);
                        checkEmailObject = JSON.parse(checkEmailString);
                        if (checkEmailObject.length === 0) {
                            result_errEmail = {
                                result: false,
                                cause: "email",
                                message: "요청하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errEmail];
                        }
                        thisUser = checkEmailObject[0];
                        hashedCorrectPassword = thisUser.password;
                        return [4 /*yield*/, bcrypt_1.default.compare(password, hashedCorrectPassword)];
                    case 2:
                        isPasswordCorrect = _b.sent();
                        if (!isPasswordCorrect) {
                            result_errPassword = {
                                result: false,
                                cause: "password",
                                message: "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
                            };
                            return [2 /*return*/, result_errPassword];
                        }
                        return [4 /*yield*/, User_1.default.delete({
                                email: email,
                            })];
                    case 3:
                        updatedUser = _b.sent();
                        updatedUserString = JSON.stringify(updatedUser);
                        updatedUserObject = JSON.parse(updatedUserString);
                        return [4 /*yield*/, User_1.default.findByEmail({ email: email })];
                    case 4:
                        checkUpdatedUser = _b.sent();
                        checkUpdatedUserString = JSON.stringify(checkUpdatedUser);
                        checkUpdatedUserObject = JSON.parse(checkUpdatedUserString);
                        if (updatedUserObject.affectedRows !== 1 &&
                            checkUpdatedUserObject.length !== 0) {
                            result_errDelete = {
                                result: true,
                                cause: "delete",
                                message: "".concat(checkEmailObject[0].nickname, "\uB2D8\uC758 \uD68C\uC6D0\uC815\uBCF4 \uC0AD\uC81C\uB97C \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."),
                            };
                            return [2 /*return*/, result_errDelete];
                        }
                        else if (updatedUserObject.affectedRows == 1 &&
                            checkUpdatedUserObject.length == 0) {
                            result_success = {
                                result: true,
                                cause: "success",
                                message: "".concat(checkEmailObject[0].nickname, "\uB2D8\uC758 \uD68C\uC6D0\uC815\uBCF4 \uC0AD\uC81C\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4."),
                            };
                            return [2 /*return*/, result_success];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return userService;
}());
module.exports = userService;
