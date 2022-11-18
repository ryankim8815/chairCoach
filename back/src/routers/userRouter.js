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
// import upload from "../middlewares/uploadMiddleware";  // (FE요청) 삭제
var userService_1 = __importDefault(require("../services/userService"));
// import asyncHandler from "../utils/asyncHandler";
// import type { MulterFile } from "../customType/multer.d";  // (FE요청) 삭제
var userRouter = express.Router();
// GET: 사용자 리스트 조회 기능
var userList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, err_1, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("before service");
                return [4 /*yield*/, userService_1.default.getAllUsers()];
            case 1:
                allUsers = _a.sent();
                console.log("after service");
                console.log(allUsers);
                res.status(200).json(allUsers);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userList api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /u/list:
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
    var email, currentUser, err_2, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.email;
                return [4 /*yield*/, userService_1.default.getCurrentUser({ email: email })];
            case 1:
                currentUser = _a.sent();
                console.log(currentUser);
                res.status(200).json(currentUser);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userCurrent api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /u/current:
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
                console.log(newUser);
                res.status(200).json(newUser);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userRegister api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /u/register:
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
var userLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, logedinUser, err_4, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, userService_1.default.getUser({ email: email, password: password })];
            case 1:
                logedinUser = _a.sent();
                console.log(logedinUser);
                res.status(200).json(logedinUser);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userLogin api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /u/login:
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
// POST: 회원정보 수정
var userUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, currentPassword, password, nickname, updateUser, err_5, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.email;
                currentPassword = req.body.currentPassword;
                password = req.body.password;
                nickname = req.body.nickname;
                return [4 /*yield*/, userService_1.default.updateUser({
                        email: email,
                        currentPassword: currentPassword,
                        password: password,
                        nickname: nickname,
                    })];
            case 1:
                updateUser = _a.sent();
                console.log(updateUser);
                res.status(200).json(updateUser);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userUpdate api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /u/update:
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
    var email, password, deleteUser, err_6, result_err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.email;
                password = req.body.password;
                return [4 /*yield*/, userService_1.default.deleteUser({
                        email: email,
                        password: password,
                    })];
            case 1:
                deleteUser = _a.sent();
                console.log(deleteUser);
                res.status(200).json(deleteUser);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                result_err = {
                    result: false,
                    cause: "api",
                    message: "userDelete api에서 오류가 발생했습니다.",
                };
                console.log(result_err);
                res.status(200).json(result_err);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * @swagger
 * /u/delete:
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
// (FE요청) 삭제
// //// POST: 프로필 사진 업로드
// const userUploadImage = async (
//   req: express.Request & { files: MulterFile[] },
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   try {
//     const email = req.email;
//     // const old_filename = req.filename;
//     const new_filename = req.file.filename;
//     console.log("new_filename: ", new_filename);
//     const uploadUserImage = await userService.uploadUserImage({
//       email,
//       new_filename,
//     });
//     console.log(uploadUserImage);
//     res.status(200).json(uploadUserImage);
//   } catch (err) {
//     const result_err = {
//       result: false,
//       cause: "api",
//       message: "uploadUserImage api에서 오류가 발생했습니다.",
//     };
//     console.log(result_err);
//     res.status(200).json(result_err);
//   }
// };
// /**
//  * @swagger
//  * /u/upload_image:
//  *   post:
//  *     summary: 프로필 사진 업로드
//  *     description: 확장자, 사이즈, 용량 제한에 대한 사항은 아직 미정입니다.
//  *     tags: ["userRouter"]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       content:
//  *        multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               file:
//  *                type: string
//  *                format: binary
//  *     responses:
//  *       200:
//  *         description: successful operation
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 result:
//  *                   type: boolean
//  *                   example: true
//  *                 cause:
//  *                   type: string
//  *                   example: success
//  *                 message:
//  *                   type: string
//  *                   example: ${nickname}님의 프로필 사진 업데이트가 성공적으로 이뤄졌습니다.
//  */
// api index
userRouter.get("/u/list", userList); // 전체 사용자 검섹
userRouter.get("/u/current", authMiddleware_1.default, userCurrent); // 현재 사용자 정보 조회
userRouter.post("/u/register", userRegister); // 자체 회원가입
userRouter.post("/u/login", userLogin); // 로그인
userRouter.put("/u/update", authMiddleware_1.default, userUpdate); // 유저 정보 업데이트(pw & nickname)
userRouter.delete("/u/delete", authMiddleware_1.default, userDelete); // 유저 삭제
module.exports = userRouter;
