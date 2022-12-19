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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyRecordsFindByYear = exports.bodyRecordsFindByWeek = exports.bodyUpdateSchema = exports.bodyCreateSchema = exports.bodyRecordsSchema = exports.neckRecordsFindByYear = exports.fileSchema = exports.neckResultSchema = exports.neckResultsSchema = exports.setAlertSchema = exports.checkPasswordSchema = exports.signupNicknameSchema = exports.verifyEmailSchema = exports.signupEmailSchema = exports.userDeleteSchema = exports.socialLoginUserUpdateSchemaParams = exports.socialLoginUserUpdateSchema = exports.userUpdateSchema = exports.userLoginSchema = exports.userCreateSchema = exports.userCurrentSchema = exports.codeSchema = void 0;
var joi_1 = __importDefault(require("joi"));
var Default = __importStar(require("./default.joi"));
var Users = __importStar(require("./users.joi"));
var Necks = __importStar(require("./necks.joi"));
var Bodies = __importStar(require("./bodies.joi"));
// socialLoginRouter
exports.codeSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    code: joi_1.default.string().required(),
});
// userRouter
exports.userCurrentSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
});
exports.userCreateSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    email: Users.email.required(),
    password: Users.password.required(),
    nickname: Users.nickname.required(),
});
exports.userLoginSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    email: Users.email.required(),
    password: Users.password.required(),
});
exports.userUpdateSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    password: Users.password.required(),
    nickname: Users.nickname.required(),
});
exports.socialLoginUserUpdateSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    nickname: Users.nickname.required(),
});
exports.socialLoginUserUpdateSchemaParams = joi_1.default.object().keys({
    user_id: Users.user_id.required(),
    provider: Users.provider.required(),
});
exports.userDeleteSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    password: Users.password.required(),
});
exports.signupEmailSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    email: Users.email.required(),
});
exports.verifyEmailSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    email: Users.email.required(),
    code: Users.code.required(),
});
exports.signupNicknameSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    nickname: Users.nickname.required(),
});
exports.checkPasswordSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    password: Users.password.required(),
});
exports.setAlertSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    alert: Users.alert.required(),
    timer: Users.timer.required(),
});
// neckRouter
exports.neckResultsSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
});
exports.neckResultSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    result: Necks.neckResult.required(),
    score: Necks.neckScore.required(),
});
exports.fileSchema = joi_1.default.object().keys({
    fieldname: Necks.multerFieldname.required(),
    originalname: Necks.multerOriginalname.required(),
    encoding: Necks.multerEncoding.required(),
    mimetype: Necks.multerMimetype.required(),
    destination: Necks.multerDestination.required(),
    filename: Necks.multerFilename.required(),
    path: Necks.multerPath.required(),
    size: Necks.multerSize.required(),
});
exports.neckRecordsFindByYear = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    year: Necks.year.required(),
});
// bodyRouter
exports.bodyRecordsSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
});
exports.bodyCreateSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    tag: Bodies.bodyTag.required(),
});
exports.bodyUpdateSchema = joi_1.default.object().keys({
    requestClientIp: Default.requestClientIp,
    requestStartTime: Default.requestStartTime,
    user_id: Users.user_id.required(),
    body_id: Bodies.body_id.required(),
});
exports.bodyRecordsFindByWeek = joi_1.default.object().keys({
    user_id: Users.user_id.required(),
    week: Bodies.week.required(),
    year: Bodies.year.required(),
});
exports.bodyRecordsFindByYear = joi_1.default.object().keys({
    user_id: Users.user_id.required(),
    year: Bodies.year.required(),
});
