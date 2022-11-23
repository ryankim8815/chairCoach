"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeleteSchema = exports.userUpdateSchema = exports.userLoginSchema = exports.userCreateSchema = exports.userCurrentSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.userCurrentSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
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
        // .pattern(new RegExp("^[A-Za-z0-9_-]{2,10}$")) // 최소 2~10 자, 영어 숫자 // FE에서 url에서 활용하지 않는다고 해서 주석처리함
        .min(3) // FE에서 확정전 임의 값
        .max(10) // FE에서 확정전 임의 값
        .required(),
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
    currentPassword: joi_1.default.string()
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
        .required(),
    nickname: joi_1.default.string()
        // .pattern(new RegExp("^[A-Za-z0-9_-]{2,10}$")) // 최소 2~10 자, 영어 숫자 // FE에서 url에서 활용하지 않는다고 해서 주석처리함
        .min(3) // FE에서 확정전 임의 값
        .max(10) // FE에서 확정전 임의 값
        .required(),
});
exports.userDeleteSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"))
        .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
});
