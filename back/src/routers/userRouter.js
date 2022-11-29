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
var express = __importStar(require("express"));
var authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
var nodemailerMiddleware_1 = __importDefault(require("../middlewares/nodemailerMiddleware"));
var validation = __importStar(require("../middlewares/validationMiddleware"));
var userService_1 = __importDefault(require("../services/userService"));
// import logger from "../../config/logger";
var logger = require("../../config/logger");
var userRouter = express.Router();
// GET: 사용자 리스트 조회 기능
var userList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, err_1, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userService_1.default.getAllUsers()];
            case 1:
                allUsers = _a.sent();
                logger.info(allUsers);
                return [2 /*return*/, res.status(200).json(allUsers)];
            case 2:
                err_1 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userList api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /users:
 *   get:
 *     summary: 전체 사용자 조회
 *     description: 전체 사용자 조회
 *     tags: ["userRouter"]
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 모든 사용자 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     provider:
 *                       type: string
 *                     created_at:
 *                       type: timstamp
 *                   example:
 *                     - email: user1@gmail.com
 *                       nickname: user1
 *                       provider: kakao
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                     - email: user2@gmail.com
 *                       nickname: user2
 *                       provider: naver
 *                       created_at: 2022-11-01T01:01:01.000Z
 */
// GET: 현재 사용자 정보 조회 기능
var userCurrent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, currentUser, err_2, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.body.user_id;
                return [4 /*yield*/, userService_1.default.getCurrentUser({ user_id: user_id })];
            case 1:
                currentUser = _a.sent();
                logger.error(currentUser); // test
                return [2 /*return*/, res.status(200).json(currentUser)];
            case 2:
                err_2 = _a.sent();
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
}); };
/**
 * @swagger
 * /user:
 *   get:
 *     summary: 현재 사용자 조회
 *     description: 현재 로그인된 사용자 정보를 조회합니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 현재 사용자 정보 조회가 성공적으로 이뤄졌습니다.
 *                 email:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 provider:
 *                   type: string
 *                 created_at:
 *                   type: timstamp
 *                   example:
 *                     email: user1@gmail.com
 *                     nickname: user1
 *                     provider: kakao
 *                     created_at: 2022-11-03T04:52:32.000Z
 */
// POST: 회원가입 기능
var userRegister = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, nickname, newUser, err_3, result_err;
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
                err_3 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userRegister api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 회원가입
 *     description: email과 nickname은 중복 검사가 필요합니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user1@gmail.com
 *               password:
 *                 type: string
 *                 example: password1234
 *               nickname:
 *                 type: string
 *                 example: userNickname
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: ${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.
 */
// POST: 로그인
var userSignin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, signinUser, err_4, result_err;
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
                err_4 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userLogin api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: 로그인
 *     description: email과 password가 필요합니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user1@gmail.com
 *               password:
 *                 type: string
 *                 example: password1234
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: ${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.
 *                 token:
 *                   type: string
 *                   example: awj32ew86tgcvwstudggaiqa98yiqgdiqyas238ewyufdhjv29qiaedz87iyhvd
 *                 email:
 *                   type: string
 *                   example: user1@gmail.com
 *                 nickname:
 *                   type: string
 *                   example: bowwow
 *                 provider:
 *                   type: string
 *                   example: google
 *                 created_at:
 *                   type: timestamp
 *                   example: 2022-11-01T01:01:01.000Z
 */
// POST: 회원정보 수정을 위한 비밀번호 확인
var userPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, password, updateUser, err_5, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.body.user_id;
                password = req.body.password;
                return [4 /*yield*/, userService_1.default.passwordCheck({
                        user_id: user_id,
                        password: password,
                    })];
            case 1:
                updateUser = _a.sent();
                return [2 /*return*/, res.status(200).json(updateUser)];
            case 2:
                err_5 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userPassword api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /user/password:
 *   post:
 *     summary: 회원정보 수정을 위한 비밀번호 확인
 *     description: 회원정보 수정을 위한 비밀번호 확인
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: test1234
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 입력하신 password가 일치합니다.
 */
// POST: 회원정보 수정
var userUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, currentPassword, password, nickname, updateUser, err_6, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.body.user_id;
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
                err_6 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userUpdate api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /user:
 *   put:
 *     summary: 회원정보 수정
 *     description: 회원정보 수정 시에도 nickname은 중복 검사가 필요합니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: new_password
 *               currentPassword:
 *                 type: string
 *                 example: current_password
 *               nickname:
 *                 type: string
 *                 example: new_nickname
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: ${nickname}님의 회원정보 수정이 성공적으로 이뤄졌습니다.
 */
// DELETE: 회원정보 삭제
var userDelete = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, password, deleteUser, err_7, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.body.user_id;
                password = req.body.password;
                return [4 /*yield*/, userService_1.default.deleteUser({
                        user_id: user_id,
                        password: password,
                    })];
            case 1:
                deleteUser = _a.sent();
                return [2 /*return*/, res.status(200).json(deleteUser)];
            case 2:
                err_7 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userDelete api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /user:
 *   delete:
 *     summary: 회원정보 삭제
 *     description: 한번 삭제한 사용자는 복구할 수 없습니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: password1234
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: ${nickname}님의 회원정보 삭제가 성공적으로 이뤄졌습니다.
 */
/// POST: email 인증을 위한 코드 발송
var signupEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, code, sendCodeToEmail, err_8, result_err;
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
                err_8 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "signupEmail api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /signup/email:
 *   post:
 *     summary: email 인증을 위한 코드 발송
 *     description:  코드 발급전에 중복확인을 실시합니다. 재발급 가능하며, 회원 가입시 코드는 폐기됩니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: email 인증을 위한 코드 (재)발송이 성공적으로 이뤄졌습니다.
 */
/// GET: email 인증 코드 확인
var signupVerifyEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, code, verifyEmailCode, err_9, result_err;
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
                err_9 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "signupVerifyEmail api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /signup/email/{email}/code/{code}:
 *   get:
 *     summary: email 인증 코드 확인
 *     description: 인증 완료시 code는 삭제됩니다.
 *     tags: ["userRouter"]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: email 인증을 위한 코드 인증
 */
/// GET: nickname 중복확인
var signupNickname = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var nickname, checkNickname, err_10, result_err;
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
                err_10 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "signupNickname api에서 오류가 발생했습니다.",
                };
                return [2 /*return*/, res.status(200).json(result_err)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /signup/nickname/{nickname}:
 *   get:
 *     summary: nickname 중복확인
 *     description:  nickname 중복확인
 *     tags: ["userRouter"]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 중복된 nickname이 없습니다. 가입을 진행해주세요.
 */
// api index
userRouter.get("/users", userList); // 전체 사용자 검색, 개발시 편의용으로 사용하는 곳이 없다면 추후 삭제 예정
userRouter.get("/user", authMiddleware_1.default, validation.validateUserCurrent, userCurrent); // 현재 사용자 정보 조회
userRouter.post("/signup", validation.validateUserCreate, userRegister); // 자체 회원가입
userRouter.post("/signin", validation.validateUserLogin, userSignin); // 로그인
userRouter.post("/user/password", authMiddleware_1.default, validation.validateCheckPassword, userPassword); // 유저 정보 업데이트를 위한 password 확인
userRouter.put("/user", authMiddleware_1.default, validation.validateUserUpdate, userUpdate); // 유저 정보 업데이트(pw & nickname)
userRouter.delete("/user", authMiddleware_1.default, validation.validateUserDelete, userDelete); // 유저 삭제
userRouter.post("/signup/email", validation.validateSignupEmail, nodemailerMiddleware_1.default, signupEmail); // email로 코드 발송
userRouter.get("/signup/email/:email/code/:code", validation.validateVerifyEmail, signupVerifyEmail); // email 인증
userRouter.get("/signup/nickname/:nickname", validation.validateSignupNickname, signupNickname); // nickname 중복확인
module.exports = userRouter;
