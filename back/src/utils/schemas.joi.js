"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeleteSchema = exports.userUpdateSchema = exports.userLoginSchema = exports.userCreateSchema = exports.userCurrentSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.userCurrentSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    //   user_id: Joi.number().required(), // test
});
exports.userCreateSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: {
            allow: ["com", "net"],
        },
    })
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
        .required(),
    nickname: joi_1.default.string()
        .pattern(new RegExp("^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{2,8}$")) // 최소 2 자, 한글 영어 숫자
        .required(),
    //   user_id: Joi.number().required(), // test
});
exports.userLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: {
            allow: ["com", "net"],
        },
    })
        .required(),
    password: joi_1.default.string().required(),
});
exports.userUpdateSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    currentPassword: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    nickname: joi_1.default.string().required(),
    //   user_id: Joi.number().required(), // test
});
exports.userDeleteSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    //   password: Joi.number().required(),
    //   user_id: Joi.number().required(), // test
});
